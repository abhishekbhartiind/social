import AppDataSource, { dataManager } from "../AppDataSource";
import { Like } from "../entities/like";
import { PostEntity as Post } from "../entities/post";
import { Resolvers } from "../generated/graphql";
import { generateUrl, uploadImage } from "../utils/saveToCloudinary";

export const PostResolvers: Resolvers = {
    PaginatedList: {
        __resolveType(list) {
            return list.__typename!;
        }
    },
    Query: {
        async posts(_, { options: { limit, cursor } }) {
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
                data: posts.slice(0, realLimit),
                hasMore: posts.length === paginatedLimit,
            }
        },
        post(_, { id }) {
            return dataManager.findOneBy(Post, { id: parseInt(id) });
        }
    },
    Mutation: {
        async createPost(_, { title, text, images }, { req }) {
            return AppDataSource.transaction(async (tm) => {
                const post = tm.create(Post, {
                    title,
                    text,
                    creatorId: req.session.userId,
                });

                if (images.length > 0) {
                    const imagePromises = images.map((image) => {
                        return uploadImage(image);
                    });
                    const resolvedImages = await Promise.all(imagePromises);
                    tm.merge(Post, post, { images: resolvedImages });
                    await tm.save(post);
                    return post;
                } else {
                    await tm.save(post);
                    return post;
                }
            });
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
        async isLiked({ id }, _, { req, postUserLikeLoader }) {
            if (!req.session.userId) {
                return null;
            }
            const like = await postUserLikeLoader.load({ 
                postId: id, 
                userId: req.session.userId 
            });
            return like ? true : false;
        },
        async likeCount({ id }, _, { postLikesArrayLoader }) {
            // const likes = await dataManager.findBy(Like, 
            //     { postId: id }); 
            return postLikesArrayLoader.load(id).then((likes) => likes.length);
            // return likes.length;
        },
        async commentCount({ id }, _, { commentsArrayLoader }) {
            return commentsArrayLoader.load(id).then(data => data.length);
        },
        async imageLinks({ id }) {
            const post = await dataManager.findOneBy(Post, { id });
            const images = post?.images.map(image => {
                if (image.includes('instapets')) {
                    return generateUrl(image);
                } else {
                    return image;
                }
            })
            return images || [];
        }
    },
}

