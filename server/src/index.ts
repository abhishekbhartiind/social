import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { json } from "body-parser";
import connectRedis, { RedisStoreOptions } from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { applyMiddleware } from "graphql-middleware";
import Redis from "ioredis";
import "reflect-metadata";
import AppDataSource from "./AppDataSource";
import { COOKIE_NAME, __prod__ } from "./constants";
import { postMiddleware } from "./middlewares/post";
import { CommentResolvers } from "./resolvers/comment";
import { PostResolvers } from "./resolvers/Post";
import { UserResolvers } from "./resolvers/user";
import { MyContext } from "./types/context";
import { createCommentLikesArrayLoader, createCommentUserLikeLoader } from "./utils/loaders/createCommentLikeLoader";
import { createCommentsArrayLoader, createRepliesArrayLoader } from "./utils/loaders/createCommentLoader";
import {
    createPostLikesArrayLoader,
    createPostUserLikeLoader
} from "./utils/loaders/createPostLikeLoader";
import createUserLoader from "./utils/loaders/createUserLoader";
import { typeDefs } from "./utils/typeDefs";

const main = async () => {
    await AppDataSource.initialize();
    //await AppDataSource.runMigrations()
    const app = express();

    //set up sessions and cookies
    const RedisStore = connectRedis(session);
    const redis = new Redis();
    const redisStoreOptions: RedisStoreOptions = {
        client: redis,
        disableTouch: true
    };

    app.use(session({
        name: COOKIE_NAME,
        store: new RedisStore(redisStoreOptions),
        secret: "asfasfqweasfqaer",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: __prod__,
            sameSite: "lax",
        },
        saveUninitialized: false,
        resave: false,
    }));

    //set up apollo server
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: [PostResolvers, UserResolvers, CommentResolvers]
    })
    
    const schemaWithMiddleware = applyMiddleware(schema, postMiddleware);
    
    const apolloServer = new ApolloServer({
        schema: schemaWithMiddleware,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({
                includeCookies: true,
            })
        ]
    });

    await apolloServer.start();
    
    app.use('/graphql', 
        json(),
        cors<cors.CorsRequest>({
            credentials: true,
            origin: [
                "https://studio.apollographql.com",
                "http://localhost:3000"
            ]
        }),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }): Promise<MyContext> => ({
                req,
                res,
                redis,
                userLoader: createUserLoader(),
                postLikesArrayLoader: createPostLikesArrayLoader(),
                postUserLikeLoader: createPostUserLikeLoader(),
                commentLikesArrayLoader: createCommentLikesArrayLoader(),
                commentUserLikeLoader: createCommentUserLikeLoader(),
                commentsArrayLoader: createCommentsArrayLoader(),
                repliesArrayLoader: createRepliesArrayLoader(),
            })
        })
    );

    app.listen(4040, () => {
        console.log('Server is up at Port: 4040');
    })
}

main();
