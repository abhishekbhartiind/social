import DataLoader from "dataloader";
import { groupBy } from "lodash";
import { In } from "typeorm";
import { dataManager } from "../../AppDataSource";
import { Like } from "../../entities/like";

export const createPostLikesArrayLoader = () => {
    return new DataLoader<number, Like[]>(async (postIds) => {
        const allLikesFound = await dataManager.findBy(Like, {
            postId: In(postIds),
        });
        const likesGroupedByPostId = groupBy<Like>(allLikesFound, "postId");
        return postIds.map((postId) => likesGroupedByPostId[postId] || []);
    });
};

export function createPostUserLikeLoader() {
    return new DataLoader<{ postId: number, userId: number }, Like | null>
    (async (keys) => {
        const likes = await dataManager
            .getRepository(Like)
            .createQueryBuilder()
            .whereInIds(keys)
            .getMany();
        const keyToLike: Record<string, Like> = {};
        likes.forEach((like) => {
            keyToLike[`${like.userId}|${like.postId}`] = like;
        });

        return keys.map((key) => keyToLike[`${key.userId}|${key.postId}`]);
    });
};
