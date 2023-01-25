import gql from "graphql-tag";
import { createContext, ReactNode, useContext, useState } from "react";
import { BaseComment, MeQuery, Reply, useDeleteCommentMutation, useEditCommentMutation, useMeQuery } from "../gql/graphql";
import { updateCacheAfterDeleteComment } from "../utils/updateCache";

type ParentComment = { author: string, id: string } | null;

type CommentContextType = {
    meData: MeQuery | undefined;
    parentComment: ParentComment;
    onEditComment: (
        postId: string, 
        commentId: string, 
        content: string, 
        commentType: "BaseComment" | "Reply"
    ) => void;
    onDeleteComment: (
        postId: string, 
        commentId: string, 
        commentType: "BaseComment" | "Reply",
        parentCommentId?: string,
    ) => void;
    onSetParentComment: (options: ParentComment) => void;
    isBaseComment: (comment: BaseComment | Reply) => comment is BaseComment;
};

const CommentContext = createContext<CommentContextType>({} as CommentContextType);

export const CommentContextProvider = (
    { children }: 
    { children?: ReactNode }
) => {
    const [parentComment, setParentComment] = useState<ParentComment>(null);

    const { data: meData } = useMeQuery();
    const [editComment] = useEditCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const onSetParentComment = (options: ParentComment) => {
        setParentComment(options);
    }

    const onEditComment = async (
        postId: string, 
        commentId: string, 
        content: string, 
        commentType: "BaseComment" | "Reply"
    ) => {
        await editComment({
            variables: {
                commentId,
                postId,
                content,
            },
            update: (cache) => {
                cache.updateFragment<{ 
                    content: string,
                }>({
                    id: `${commentType}:` + commentId,
                    fragment: gql`
                        fragment Content on ${commentType} {
                            content
                        }
                    `
                }, 
                (data) => {
                    if (data) {
                        return { 
                            ...data, 
                            content
                        };
                    }
                    return data;
                });
            }
        })
    }

    const onDeleteComment = async (
        postId: string,
        commentId: string, 
        commentType: "BaseComment" | "Reply",
        parentCommentId?: string
    ) => {
        await deleteComment({ 
            variables: {
                commentId,
                postId,
            },
            update: (cache) => {
                updateCacheAfterDeleteComment(
                    cache, 
                    postId, 
                    commentId, 
                    commentType, 
                    parentCommentId
                )
            }
        })
    }

    const isBaseComment = (comment: BaseComment | Reply): comment is BaseComment => {
        return (comment as BaseComment).repliesCount !== undefined;
    }
    
    return (
        <CommentContext.Provider 
        value={{
            meData,
            parentComment,
            onSetParentComment,
            onEditComment,
            onDeleteComment,
            isBaseComment
        }}>
            {children}
        </CommentContext.Provider>
    )
}

export const useCommentContext = () => 
    useContext(CommentContext);