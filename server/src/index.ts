import AppDataSource from "./AppDataSource"
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";


const main = async () => {
    await AppDataSource.initialize();

    const app = express();

    const apolloServer = new ApolloServer({
        typeDefs,
        resolver: 
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

function expressMiddleware(apolloServer: ApolloServer<import("@apollo/server").BaseContext>): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.");
}
