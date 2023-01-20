import { dataManager } from "../AppDataSource";
import { PostEntity as Post } from "../entities/post";
import { Resolvers } from "../generated/graphql";
import { Like } from "../entities/like";
import { CommentEntity as Comment } from "../entities/comment";

export const PostResolvers: Resolvers = {
    Query: {
        async posts(_, { limit, cursor }) {
            const realLimit = Math.min(50, limit);
            const paginatedLimit = realLimit + 1;

            const replacements: any[] = [paginatedLimit];

            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }

            const posts = await dataManager.query(`
                SELECT p.* 
                FROM post_entity p
                ${cursor ? `where p."createdAt" < $2`: ''}
                order by p."createdAt" DESC
                limit $1
            `, replacements);

            return { 
                posts: posts.slice(0, realLimit),
                hasMore: posts.length === paginatedLimit,
            }
        },
        post(_, { id }) {
            return dataManager.findOneBy(Post, { id: parseInt(id) });
        }
    },
    Mutation: {
        async createPost(_, { title, text }, { req }) {
            const post = dataManager.create(Post, {
                title,
                text,
                creatorId: req.session.userId,
            });
            await dataManager.save(post);
            return post;
        },
        async deletePost(_, { id }, { req }) {
            const post = await dataManager.findOneBy(Post, 
                { id: parseInt(id) });
            if (!post || post.creatorId !== req.session.userId) {
                return false;
            }
            await dataManager.delete(Post, 
                { 
                    id: parseInt(id),
                    creatorId: req.session.userId,
                });
            return true;
        },
        async updatePost(_, { id, title, text }, { req }) {
            const results = await dataManager
            .getRepository(Post)
            .createQueryBuilder()
            .update()
            .set({ title, text })
            .where('id = :id and "creatorId" = :creatorId', {
                id,
                creatorId: req.session.userId
            })
            .returning("*")
            .execute();
            
            return results.raw[0];
        },
        async likePost(_, { id }, { req }) {
            const existingLike = await dataManager.findOneBy(Like, {
                postId: parseInt(id),
                userId: req.session.userId
            });
            if (!existingLike) {
                const like = dataManager.create(Like, {
                    like: true,
                    postId: parseInt(id),
                    userId: req.session.userId
                });
                await dataManager.save(like);
            } else {
                await dataManager.delete(Like,
                    {
                        postId: parseInt(id), 
                        userId: req.session.userId 
                    });
            }
            return true;
        },
    },
    Post: {
        textSnippet({ text }) {
            return text.substring(0, 50);
        },
        creator({ creatorId }, _, { userLoader }) {
            return userLoader.load(creatorId);
        },
        async isLiked({ id }, _, { req }) {
            if (!req.session.userId) {
                return null;
            }
            const like = await dataManager.findOneBy(Like, 
                { postId: id, userId: req.session.userId });
            return like ? true : false;
        },
        async likeCount({ id }) {
            const likes = await dataManager.findBy(Like, 
                { postId: id });
            return likes.length;
        },
        baseComments({ id }) {
            /* return dataManager
            .query(`
            SELECT c.*, replies 
            FROM comment_entity c 
            LEFT JOIN (
                SELECT 
                "parentId", 
                COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies 
                FROM comment_entity AS replies 
                GROUP BY "parentId"
            ) AS replies ON c.id = replies."parentId" 
            WHERE c."postId" = $1 and c."parentId" IS NULL;
            `, [id]); */

            return dataManager
            .getRepository(Comment)
            .createQueryBuilder()
            .select()
            .where('"postId" = :postId and "parentId" IS NULL', { postId: id })
            .getMany();
        },
        async commentCount({ id }) {
            return dataManager.findBy(Comment, { postId: id }).then(data => data.length);
        }
    },
}

