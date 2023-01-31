import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo } from "next-apollo";
import { NextPageContext } from "next";

type PaginatedResults = {
    hasMore: boolean,
    data: Array<Record<string, any>>
};

const mergeResults = <T extends PaginatedResults>(
    existing: T | undefined, 
    incoming: T | undefined
): PaginatedResults  => {
    return {
        ...incoming,
        hasMore: !!incoming?.hasMore,
        data: [
            ...(existing?.data || []), 
            ...(incoming?.data || [])
        ],
    };
}

const client = (ctx: NextPageContext) => new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        keyArgs: ['limit'],
                        merge: mergeResults
                    },
                    postsByCreatorId: {
                        keyArgs: ['creatorId', 'limit'],
                        merge: mergeResults
                    },
                    baseComments: {
                        keyArgs: ["postId"],
                        merge: mergeResults,
                    },
                    // only merge if parentCommentId doesn't change; if it changes, then new cache store 
                    replies: {
                        keyArgs: ["parentCommentId"],
                        merge: mergeResults
                    }
                }
            }
        }
    }),
    credentials: "include",
});

export default withApollo(client);