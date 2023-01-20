import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { dataManager } from "../AppDataSource";
import { UserEntity as User } from "../entities/user";
import { Resolvers } from "../generated/graphql";

export const UserResolvers: Resolvers = {
    Query: {
        me(_, __, { req }) {
            if (!req.session.userId) {
                return null;
            }
            return dataManager.findOneBy(User, 
                { id: req.session.userId });
        }
    },
    Mutation: {
        async login(_, { username, password }, { req }) {
            const existingUser = await dataManager.findOneBy(User, 
                { username });
            if (!existingUser) {
                return {
                    errors: [{
                        field: "username",
                        message: "No user with this username!"
                    }]
                }
            }
            const validPassword = await argon2.verify(existingUser.password, password);
            if (!validPassword) {
                return { 
                    errors: [{
                        field: "password",
                        message: "Invalid password!"
                    }]
                }
            }
            req.session.userId = existingUser.id;
            return { user: existingUser };
        },
        async register(_, 
            { options: { username, password, email } }, 
            { req }) {
            const existingUser = await dataManager.findOneBy(User, 
                { username });
            if (existingUser) {
                return {
                    errors: [{
                        field: "username",
                        message: "This username is taken!"
                    }]
                }
            } 
            const hashedPassword = await argon2.hash(password);
            const newUser = dataManager.create(User, 
                { 
                    username, 
                    password: hashedPassword, 
                    email 
                });
            await dataManager.save(newUser);
            req.session.userId = newUser.id;
            return { user: newUser };
        }, 
        logout(_, __, { req, res }) {
            return new Promise((resolve: any) => {
                req.session.destroy((err) => {
                    if (err) {
                        resolve(false);
                        return false;
                    } 
                    res.clearCookie(COOKIE_NAME);
                    resolve(true);
                    return true;
                })
            })
        }
    },
};
