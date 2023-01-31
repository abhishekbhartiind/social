import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { json, text } from "body-parser";
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
import { PostResolvers } from "./resolvers/post";
import { UserResolvers } from "./resolvers/user";
import { MyContext } from "./types/context";
import { createCommentLikesArrayLoader, createCommentUserLikeLoader } from "./utils/loaders/createCommentLikeLoader";
import { createCommentsArrayLoader, createRepliesArrayLoader } from "./utils/loaders/createCommentLoader";
import {
    createPostLikesArrayLoader,
    createPostUserLikeLoader
} from "./utils/loaders/createPostLikeLoader";
import createUserLoader from "./utils/loaders/createUserLoader";
import { createUserPostCountLoader } from "./utils/loaders/createUserLoader";
import { typeDefs } from "./utils/typeDefs";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
    await AppDataSource.initialize();
    //await AppDataSource.runMigrations();

    const app = express();

    //set up sessions and cookies
    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    const redisStoreOptions: RedisStoreOptions = {
        client: redis,
        disableTouch: true
    };

    app.set("trust proxy", 1);
    app.set("Access-Control-Allow-Origin", [
        "https://studio.apollographql.com", 
        process.env.CORS_ORIGIN
    ]);
    app.set("Access-Control-Allow-Credentials", true);

    app.use(session({
        name: COOKIE_NAME,
        store: new RedisStore(redisStoreOptions),
        secret: process.env.REDIS_URL,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: __prod__,
            sameSite: "lax",
            domain: __prod__ ? '.sereyratanakroth.com' : undefined,
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
        json({ limit: '50mb' }),
        text({ limit: '200mb '}),
        cors<cors.CorsRequest>({
            credentials: true,
            origin: [
                "https://studio.apollographql.com",
                "http://localhost:3000",
                process.env.CORS_ORIGIN,
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
                totalPostCountLoader: createUserPostCountLoader(),
            })
        })
    );

    const PORT = process.env.PORT || '4040';
    app.listen(parseInt(process.env.PORT), () => {
        console.log(`Server is up at Port: ${PORT}`);
    })
}

main();
