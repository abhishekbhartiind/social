import { dataManager } from "../AppDataSource";
import { PostEntity as Post } from "../entities/post";
import { Resolvers } from "../generated/graphql";

export const PostResolvers: Resolvers = {
    Query: {
        posts() {
            return dataManager.find(Post);
        },
        post(_, { id }) {
            return dataManager.findOneBy(Post, { id: parseInt(id) });
        }
    },
    Mutation: {
        async createPost(_, { title, text }) {
            const post = dataManager.create(Post, {
                title,
                text
            });
            await dataManager.save(post);
            return post;
        },
        async deletePost(_, { id }) {
            await dataManager.delete(Post, { id: parseInt(id) });
            return true;
        },
        async updatePost(_, { id, title, text }) {
            const post = await dataManager.findOneBy(Post, 
                { id: parseInt(id) });
        
            await dataManager.update(Post, 
                { id: parseInt(id) }, 
                { title, text });
            
            return post;
        }
    }
}

