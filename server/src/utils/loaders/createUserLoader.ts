import DataLoader from "dataloader";
import { dataManager } from "../../AppDataSource";
import { UserEntity as User } from "../../entities/user";
import { In } from "typeorm";

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