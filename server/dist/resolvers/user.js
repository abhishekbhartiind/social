"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = void 0;
const AppDataSource_1 = require("../AppDataSource");
const user_1 = require("../entities/user");
exports.UserResolvers = {
    Query: {
        me(_, { id }) {
            return AppDataSource_1.dataManager.findOneBy(user_1.UserEntity, { id: parseInt(id) });
        }
    },
    Mutation: {
        async login(_, { username, password }) {
            const existingUser = await AppDataSource_1.dataManager.findOneBy(user_1.UserEntity, { username });
            if (!existingUser) {
                return null;
            }
            const validPassword = password === existingUser.password;
            if (!validPassword) {
                return null;
            }
            return existingUser;
        },
        async register(_, { username, password, email }) {
            const existingUser = await AppDataSource_1.dataManager.findOneBy(user_1.UserEntity, { username });
            if (existingUser) {
                return existingUser;
            }
            const newUser = AppDataSource_1.dataManager.create(user_1.UserEntity, { username, password, email });
            await AppDataSource_1.dataManager.save(newUser);
            return newUser;
        },
        logout() {
            return true;
        }
    }
};
//# sourceMappingURL=user.js.map