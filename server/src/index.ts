import "reflect-metadata";
import AppDataSource from "./AppDataSource"
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./utils/typeDefs";
import { PostResolvers } from "./resolvers/Post";
import { UserResolvers } from "./resolvers/user";
import { makeExecutableSchema } from "@graphql-tools/schema";
import session from "express-session";
import Redis from "ioredis";
import connectRedis,{ RedisStoreOptions }  from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import { MyContext } from "./types/context";
import { applyMiddleware } from "graphql-middleware";
import { postMiddleware } from "./middlewares/post";
import { CommentResolvers } from "./resolvers/comment";

const main = async () => {
    await AppDataSource.initialize();

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
            ]
        }),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }): Promise<MyContext> => ({
                req,
                res,
                redis,
            })
        })
    );

    app.listen(4040, () => {
        console.log('Server is up at Port: 4040');
    })
}

main();
