import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { BaseComment, Reply } from "../../gql/graphql";

interface CommentProps {
  comment: BaseComment | Reply;
  onReply: () => void;
}

export const Comment: React.FC<CommentProps> = ({ 
    comment, onReply
}) => {
    return (
        <Flex alignItems='start' gap={2}>
            <Avatar size='sm' name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Box key={comment.id}>
                <Flex alignItems='center' gap={2}>
                    <Heading size='sm'>{comment.author.username}</Heading>
                    <Text fontSize='xs' pt={0.5}>
                        {formatDistanceToNow(
                            new Date(parseInt(comment.createdAt)), {
                                addSuffix: true
                            })}
                    </Text>
                </Flex>
                <Text>
                    {comment.content}
                </Text>
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
            </Box>
        </Flex>
    );
};
