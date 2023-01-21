import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo";
import { NextPageContext } from "next";
import { PaginatedPosts } from "../gql/graphql";

const client = (ctx: NextPageContext) => new ApolloClient({
    uri: "http://localhost:4040/graphql",
    headers: {
        cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        keyArgs: false,
                        merge(
                            existing: PaginatedPosts | undefined, 
                            incoming: PaginatedPosts | undefined
                        ): PaginatedPosts {
                            return {
                                ...incoming,
                                hasMore: !!incoming?.hasMore,
                                posts: [
                                    ...(existing?.posts || []), 
                                    ...(incoming?.posts || [])
                                ],
                            };
                        }
                    }
                }
            }
        }
    }),
    credentials: "include",
});

export default withApollo(client);