import { Box, Divider, Flex, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Button } from "@chakra-ui/button";
import React from "react";
import { CommentContextProvider } from "../../context/CommentContext";
import { useBaseCommentsQuery } from "../../gql/graphql";
import { AddComment } from "../AddComment";
import { Comment } from "../comments/Comment";

interface CommentSectionProps {
    postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    postId
}) => {
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
        <CommentContextProvider>
            <Box>
                {commentData?.baseComments?.data && 
                <Stack px={1}>
                    {commentData.baseComments.data.map(comment => (
                        <Comment 
                        key={comment.id} 
                        loading={loading}
                        comment={comment} />
                    ))}
                </Stack>}
                {commentData && commentData.baseComments.hasMore && (
                    <Skeleton 
                    isLoaded={!loading}
                    height='8'>
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
                    </Skeleton>
                )}
                <Box
                    position="sticky"
                    bgColor="white"
                    bottom={0}
                    right={0}
                    left={0}
                    px={1}
                    py={1}
                >
                    <AddComment postId={postId} />
                </Box>
            </Box>
        </CommentContextProvider>
    );
};
