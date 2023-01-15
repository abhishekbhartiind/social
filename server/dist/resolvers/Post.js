"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolvers = void 0;
const AppDataSource_1 = require("../AppDataSource");
const post_1 = require("../entities/post");
exports.PostResolvers = {
    Query: {
        posts() {
            return AppDataSource_1.dataManager.find(post_1.PostEntity);
        },
        post(_, { id }) {
            return AppDataSource_1.dataManager.findOneBy(post_1.PostEntity, { id: parseInt(id) });
        }
    },
    Mutation: {
        async createPost(_, { title, text }) {
            const post = AppDataSource_1.dataManager.create(post_1.PostEntity, {
                title,
                text
            });
            await AppDataSource_1.dataManager.save(post);
            return post;
        },
        async deletePost(_, { id }) {
            await AppDataSource_1.dataManager.delete(post_1.PostEntity, { id: parseInt(id) });
            return true;
        },
        async updatePost(_, { id, title, text }) {
            const post = await AppDataSource_1.dataManager.findOneBy(post_1.PostEntity, { id: parseInt(id) });
            await AppDataSource_1.dataManager.update(post_1.PostEntity, { id: parseInt(id) }, { title, text });
            return post;
        }
    }
};
//# sourceMappingURL=Post.js.map