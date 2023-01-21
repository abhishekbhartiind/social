import { Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useBaseCommentsQuery } from "../../gql/graphql";
import { AddComment } from "../AddComment";
import { Comment } from "../comments/Comment";

interface CommentSectionProps {
    postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    postId
}) => {
    const [parentComment, setParentComment] = useState<{
        author: string,
        id: string,
    } | null>(null);

    const { data: commentData } = useBaseCommentsQuery({
        skip: postId === "",
        variables: {
            postId,
        },
    })

    const handleReplyClick = (author: string, id: string) => {
        setParentComment({ author, id });
    }

    return (
        <>
            <Stack my={4} px={1}>
                {commentData?.baseComments.map((comment) => (
                    <Comment 
                    key={comment.id} 
                    comment={comment}
                    onReply={() => handleReplyClick(
                        comment.author.username, 
                        comment.id
                    )} />
                ))}
            </Stack>
            <Box
                position="sticky"
                bgColor="white"
                bottom={0}
                right={0}
                left={0}
                px={1}
                py={1}
            >
                <AddComment 
                    postId={postId} 
                    parentCommentAuthor={parentComment?.author}
                    parentCommentId={parentComment?.id} 
                    onSuccess={() => setParentComment(null)}/>
            </Box>
        </>
    );
};
