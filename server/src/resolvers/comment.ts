import { dataManager } from "../AppDataSource";
import { Resolvers } from "../generated/graphql";
import { CommentEntity as Comment } from "../entities/comment";

export const CommentResolvers: Resolvers = {
    Query: {
        baseComments(_, { postId }) {
            return dataManager.query(`
                SELECT c.*
                FROM comment_entity c
                WHERE c."postId" = $1 and c."parentId" IS NULL
                ORDER BY c."createdAt" DESC;
                `, [postId]);
        },
        replies(_, { parentCommentId }) {
            return dataManager.query(`
                SELECT c.*
                FROM comment_entity c
                WHERE c."parentId" = $1
                ORDER BY c."createdAt" DESC;
            `, [parentCommentId]);
        }
    },
    Mutation: {
        async commentPost(_, { postId, parentCommentId, content }, { req }) {
            const comment = dataManager.create(Comment, {
                content,
                postId: parseInt(postId),
                authorId: req.session.userId,
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
            return comment;
        },
        async deleteComment(_, { commentId, postId }, { req }) {
            const comment = await dataManager.findOneBy(Comment, 
                { 
                    id: parseInt(commentId),
                    postId: parseInt(postId),
                }
            );
            if (!comment || comment.authorId !== req.session.userId) {
                return false;
            }
            await dataManager.delete(Comment, {
                id: parseInt(commentId),
                postId: parseInt(postId),
                authorId: req.session.userId,
            });
            return true;
        },
        async editComment(_, { commentId, postId, content }, { req }) {
            const results = await dataManager
            .getRepository(Comment)
            .createQueryBuilder()
            .update()
            .set({ content })
            .where('id = :id and "postId" = :postId', {
                id: commentId,
                postId,
            })
            .andWhere('"authorId" = :authorId', { 
                authorId: req.session.userId
            })
            .returning("*")
            .execute();
            
            return results.raw[0];
        }
    },
    Comment: {
        __resolveType(comment) {
            if (comment.parent) {
                return 'Reply';
            } else {
                return 'BaseComment'
            }
        },
    },
    BaseComment: {
        author({ authorId }, _, { userLoader }) {
            return userLoader.load(parseInt(authorId));
        },
        async repliesCount({ id }) {
            return dataManager
            .getRepository(Comment)
            .createQueryBuilder()
            .select()
            .where('"parentId" = :id', { id })
            .getMany()
            .then(data => data.length);
        }
    },
    Reply: {
        author({ authorId }, _, { userLoader }) {
            return userLoader.load(parseInt(authorId));
        }
    }
}