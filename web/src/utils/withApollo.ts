import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo";
import { NextPageContext } from "next";

const client = (ctx: NextPageContext) => new ApolloClient({
    uri: "http://localhost:4040/graphql",
    headers: {
        cookie: (typeof window === 'undefined' ? ctx.req?.headers.cookie : undefined) || '',
    },
    cache: new InMemoryCache(),
    credentials: "include",
});

export default withApollo(client);