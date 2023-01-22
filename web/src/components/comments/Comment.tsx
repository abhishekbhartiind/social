import { Avatar, Box, Button, Flex, Heading, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { BaseComment, Reply } from "../../gql/graphql";

interface CommentProps {
  comment: BaseComment | Reply;
  onReply: () => void;
  loading: boolean;
}

export const Comment: React.FC<CommentProps> = ({ 
    comment, onReply, loading
}) => {
    return (
        <Flex alignItems='start' gap={2}>
            <SkeletonCircle isLoaded={!loading} mt={2}>
                <Avatar size='sm' name={comment.author.username} src="" />
            </SkeletonCircle>
            <Box>
                <Skeleton isLoaded={!loading} mt={2}>
                    <Flex alignItems='center' gap={2}>
                        <Heading size='sm'>{comment.author.username}</Heading>
                        <Text fontSize='xs' pt={0.5}>
                            {formatDistanceToNow(
                                new Date(parseInt(comment.createdAt)), {
                                    addSuffix: true
                                })}
                        </Text>
                    </Flex>
                </Skeleton>
                <SkeletonText 
                isLoaded={!loading}
                my={1}
                noOfLines={2}>
                    <Text>
                        {comment.content}
                    </Text>
                </SkeletonText>
                <Skeleton 
                isLoaded={!loading}
                height='5'>
                    <Flex 
                    alignItems="center" 
                    gap={2} 
                    fontSize='sm'
                    color='gray.500'>
                        <Text>0 likes</Text>
                        <Button
                        variant='unstyled'
                        fontSize='sm'
                        fontWeight='normal'
                        height='fit-content'
                        onClick={onReply}>
                            Reply
                        </Button>
                    </Flex>
                </Skeleton>
            </Box>
        </Flex>
    );
};
