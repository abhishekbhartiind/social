import DataLoader from "dataloader";
import { dataManager } from "../../AppDataSource";
import { CommentLike } from "../../entities/comment-like";
import { In } from "typeorm";
import { groupBy } from "lodash";

export const createCommentLikesArrayLoader = () => {
    return new DataLoader<number, CommentLike[]>(async (commentIds) => {
        const allLikesFound = await dataManager.findBy(CommentLike, {
            commentId: In(commentIds),
        });
        const likesGroupedByCommentId = groupBy<CommentLike>(allLikesFound, "commentId");
        return commentIds.map((commentId) => likesGroupedByCommentId[commentId] || []);
    });
};

export function createCommentUserLikeLoader() {
    return new DataLoader<{ commentId: number, userId: number }, CommentLike | null>
    (async (keys) => {
        const likes = await dataManager
            .getRepository(CommentLike)
            .createQueryBuilder()
            .whereInIds(keys)
            .getMany();
        const keyToLike: Record<string, CommentLike> = {};
        likes.forEach((like) => {
            keyToLike[`${like.userId}|${like.commentId}`] = like;
        });

        return keys.map((key) => keyToLike[`${key.userId}|${key.commentId}`]);
    });
};
