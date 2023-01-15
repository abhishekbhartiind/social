import AppDataSource from "./AppDataSource"
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./utils/typeDefs";
import { PostResolvers } from "./resolvers/Post";
import { UserResolvers } from "./resolvers/user";
import { makeExecutableSchema } from "@graphql-tools/schema";

const main = async () => {
    await AppDataSource.initialize();

    const app = express();

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: [PostResolvers, UserResolvers]
    })
    
    const apolloServer = new ApolloServer({
        schema,
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
        expressMiddleware(apolloServer)
    );

    app.listen(4040, () => {
        console.log('Server is up at Port: 4040');
    })
}

main();
