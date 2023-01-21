import { dataManager } from "../AppDataSource";
import { Resolvers } from "../generated/graphql";
import { CommentEntity as Comment } from "../entities/comment";

export const CommentResolvers: Resolvers = {
    Query: {
        replies(_, { parentCommentId }) {
            return dataManager.query(`
                SELECT c.*, 
                json_build_object('id', a.id, 'email', a.email, 'username', a.username) AS author
                FROM comment_entity c
                INNER JOIN user_entity a ON a.id = c."authorId"
                WHERE c."parentId" = $1;
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
        author({ authorId }, _, { userLoader }) {
            return userLoader.load(authorId);
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
    }
}