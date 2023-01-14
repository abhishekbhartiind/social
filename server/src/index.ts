import AppDataSource from "./AppDataSource"
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schemas";
import { buildSubgraphSchema } from "@apollo/subgraph";

const main = async () => {
    await AppDataSource.initialize();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: buildSubgraphSchema({
            typeDefs,
            resolvers: []
        })
    });
    
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
