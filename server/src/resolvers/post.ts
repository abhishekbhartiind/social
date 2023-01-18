import { UserEntity as User } from "../entities/user";
import { dataManager } from "../AppDataSource";
import { PostEntity as Post } from "../entities/post";
import { Resolvers } from "../generated/graphql";
import { Like } from "../entities/like";
import { CommentEntity as Comment } from "../entities/comment";

export const PostResolvers: Resolvers = {
    Query: {
        posts() {
            return dataManager
            .getRepository(Post)
            .createQueryBuilder("post")
            .orderBy('post."createdAt"', 'DESC')
            .getMany();
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
        async commentPost(_, { postId, parentCommentId, body }, { req }) {
            const comment = dataManager.create(Comment, 
                { 
                    body,
                    postId: parseInt(postId),
                    userId: req.session.userId,
                });
            if (parentCommentId) {
                const parentComment = await dataManager.findOneBy(Comment, {
                    id: parseInt(parentCommentId)
                });
                if (parentComment) {
                    comment.parent = parentComment;
                }
            }
            await dataManager.save(comment);
            return true;
        }
    },
    Post: {
        creator({ creatorId }) {
            return dataManager.findOneBy(User, { id: creatorId });
        },
        async isLiked({ id }, _, { req }) {
            if (!req.session.userId) {
                return null;
            }
            const like = await dataManager.findOneBy(Like, 
                { postId: id, userId: req.session.userId});
            return like ? true : false;
        },
        async likeCount({ id }) {
            const likes = await dataManager.findBy(Like, 
                { postId: id });
            return likes.length;
        },
        comments({ id }) {
            return dataManager
            .getTreeRepository(Comment)
            .createQueryBuilder()
            .select()
            .where('"postId" = :id and "parentId" IS NULL', { id })
            .getMany();
        }
    },
}

