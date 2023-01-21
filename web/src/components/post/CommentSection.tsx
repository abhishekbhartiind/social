import { Box, Button, Divider, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useBaseCommentsQuery } from "../../gql/graphql";
import { AddComment } from "../AddComment";
import { Comment } from "../comments/Comment";
import { CommentWithReplies } from "../comments/CommentWithReplies";

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

    const { data: commentData, loading, fetchMore } = useBaseCommentsQuery({
        skip: postId === "",
        variables: {
            postId,
            options: {
                limit: 5,
            }
        },
        notifyOnNetworkStatusChange: true,
    })

    const handleReplyClick = (author: string, id: string) => {
        setParentComment({ author, id });
    }

    const handleLoadMore = () => {
        if (commentData) {
            const comments = commentData.baseComments.data;
            const length = comments.length;
            fetchMore({
                variables: {
                    options: {
                        limit: 5,
                        cursor: comments[length - 1].createdAt,
                    }
                }
            });
        }
    }

    return (
        <Box my={2}>
            {commentData?.baseComments?.data && 
            <Stack px={1}>
                {commentData.baseComments.data.map((comment) => {
                    const Component = comment.repliesCount > 0 ? 
                    CommentWithReplies : Comment;
                    return <Component 
                            comment={comment} 
                            onReply={() => handleReplyClick(comment.author.username, comment.id)} />
                })}
            </Stack>}
            {commentData && commentData.baseComments.hasMore && (
                <Flex alignItems='center'>
                    <Divider borderColor='black' maxW='8' />
                    <Button
                    variant='unstyled'
                    ml={2}
                    type='button'
                    color='gray'
                    fontSize='sm'
                    isLoading={loading}
                    onClick={handleLoadMore}>
                        View more comments
                    </Button>
                </Flex>
            )}
            <Box
                position="sticky"
                bgColor='white'
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
        </Box>
    );
};
