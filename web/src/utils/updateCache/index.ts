import { ApolloCache, gql } from "@apollo/client";
import { MeDocument, MeQuery } from "../../gql/graphql";

export const updateCommentCountInCache = (
    cache: ApolloCache<any>,
    postId: string,
    change: 'UP' | 'DOWN',
    changeValue: number
) => {
    cache.updateFragment<{ 
        commentCount: number
    }>({
        id: "Post:" + postId,
        fragment: gql`
            fragment CommentCount on Post {
                commentCount
            }
        `
    }, 
    (data) => {
        if (data) {
            return { 
                ...data, 
                commentCount: data.commentCount + (change === 'UP' ? 1 : -1) * changeValue,
            };
        }
        return data;
    });
}

export const updateRepliesCountInCache = (
    cache: ApolloCache<any>,
    parentCommentId: string,
    change: 'UP' | 'DOWN',
    changeValue: number,
) => {
    cache.updateFragment<{ repliesCount: number }>({
        id: `BaseComment:${parentCommentId}`,
        fragment: gql`
            fragment RepliesCount on BaseComment {
                repliesCount
            }
        `
    }, 
    (data) => {
        if (data) {
            return {
                ...data,
                repliesCount: data.repliesCount + 
                (change === 'UP' ? 1 : -1) * changeValue,
            }
        }
        return data;
    })
}

export const updateCacheAfterDeleteComment = (
    cache: ApolloCache<any>,
    postId: string,
    commentId: string,
    commentType: "BaseComment" | "Reply",
    parentCommentId?: string
) => {
    let comment: { repliesCount?: number } | null | undefined;
    if (commentType === "BaseComment") {
        comment = cache.readFragment({
            id: `${commentType}:${commentId}`,
            fragment: gql`
                fragment RepliesCount on ${commentType} {
                    repliesCount
                }
            `
        });
    }

    const deleteCount = (comment?.repliesCount || 0) + 1;
    updateCommentCountInCache(cache, postId, 'DOWN', deleteCount);

    //update replies count of parent comment if deleted comment is a reply
    if (commentType === 'Reply' && parentCommentId) {
        updateRepliesCountInCache(cache, parentCommentId, 'DOWN', 1)
    }   

    cache.evict({ id: commentType + ":" + commentId });
    cache.gc();
}

export const updateCurrentUserTotalPostCount = (
    cache: ApolloCache<any>,
    change: 'UP' | 'DOWN',
    changeValue: number,
) => {
    cache.updateQuery<MeQuery>({
        query: MeDocument,
    }, 
    (data) => {
        if (data && data.me) {
            return {
                __typename: data.__typename,
                me: {
                    ...data.me,
                    totalPostCount: data.me.totalPostCount + 
                        (change === 'UP' ? 1 : -1) * changeValue,
                }
            }
        }
        return data;
    });
}