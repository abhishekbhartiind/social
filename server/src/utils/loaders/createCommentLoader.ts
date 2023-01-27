import DataLoader from "dataloader";
import { dataManager } from "../../AppDataSource";
import { CommentEntity as Comment } from "../../entities/comment";
import { In } from "typeorm";
import { groupBy } from "lodash";

export function createCommentsArrayLoader() {
    return new DataLoader<number, Comment[]>(
        async (postIds) => {
            const allCommentsFound = await dataManager.findBy(Comment, {
                postId: In(postIds),
            });
            const commentsGroupedByPostId = groupBy<Comment>(allCommentsFound, "postId");
            return postIds.map((postId) => commentsGroupedByPostId[postId] || []);
        }
    );
}

export function createRepliesArrayLoader() {
    return new DataLoader<number, Comment[]>(
        async (parentIds) => {
            const allRepliesFound = await dataManager
            .getRepository(Comment)
            .createQueryBuilder()
            .select()
            .where('"parentId" IN (:...ids)', { ids: parentIds })
            .getMany();
        const repliesGroupedByParentId = groupBy<Comment>(allRepliesFound, "parentId");
        return parentIds.map((parentId) => repliesGroupedByParentId[parentId] || []);
    });
}
