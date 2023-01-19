import { dataManager } from "../AppDataSource";
import { Resolvers } from "../generated/graphql";
import { CommentEntity as Comment } from "../entities/comment";

export const CommentResolvers: Resolvers = {
    Query: {
        replies(_, { parentCommentId }) {
            return dataManager.query(`
                SELECT *
                FROM comment_entity 
                WHERE "parentId" = $1,
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
            return true;
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
            .where('id = :id, "postId" =: postId and "authorId" = :authorId', {
                id: commentId,
                postId,
                authorId: req.session.userId
            })
            .returning("*")
            .execute();
            
            return results.raw[0];
        }
    }
}