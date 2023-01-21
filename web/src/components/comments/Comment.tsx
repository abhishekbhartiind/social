import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { BaseComment, Reply } from "../../gql/graphql";
import { Replies } from "./Replies";

interface CommentProps {
  comment: BaseComment | Reply;
  onReply: () => void;
}

function isBaseComment(comment: BaseComment | Reply): comment is BaseComment {
    return (comment as BaseComment).repliesCount !== undefined;
}

export const Comment: React.FC<CommentProps> = ({ 
    comment, onReply
}) => {
    const [repliesVisibility, setRepliesVisibility] = useState<'hide' | 'show'>('hide');

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
                {isBaseComment(comment) && repliesVisibility === 'show' && (
                    <Replies parentCommentId={comment.id} onReply={onReply}/>
                )}
                {isBaseComment(comment) && comment.repliesCount > 0 && (
                    <Text 
                        cursor='pointer'
                        onClick={() => setRepliesVisibility(
                            repliesVisibility === 'hide' ? 
                            'show' : 
                            'hide')
                        }>
                        {repliesVisibility === 'hide' ? `
                            View ${comment.repliesCount} more replies
                        ` : 'Hide replies'}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};
