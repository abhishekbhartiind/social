import DataLoader from "dataloader";
import { In } from "typeorm";
import { dataManager } from "../../AppDataSource";
import { UserEntity as User } from "../../entities/user";

export default function createUserLoader() {
    return new DataLoader<number, User>(
        async (userIds) => {
            const users = await dataManager.findBy(User, { id: In(userIds)});
            const userIdToUser: Record<number, User> = {};
            users.forEach(user => {
                userIdToUser[user.id] = user;
            });
            return userIds.map(uid => userIdToUser[uid]);
        }
    );
}

export const createUserPostCountLoader = () => {
    return new DataLoader<number, number>(
        async (userIds) => {
            // group rows by creatorId and count all posts with the same creator id for total post count
            const postCounts: Array<{
                creatorId: number,
                totalPosts: string,
            }> = await dataManager
            .query(`
                SELECT p."creatorId", COUNT(p.id) AS "totalPosts"
                FROM post_entity p
                WHERE p."creatorId" = ANY($1)
                GROUP BY p."creatorId"
            `, [userIds]);
            const totalPostsByUserId: Record<string, number> = {};
            postCounts.forEach(post => {
                totalPostsByUserId[post.creatorId] = parseInt(post.totalPosts);
            })
            return userIds.map(userId => totalPostsByUserId[userId]);
        }
    )
}