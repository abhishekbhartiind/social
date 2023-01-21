import { Flex, Box, Text, Avatar, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { BaseComment, Reply } from "../../gql/graphql";
import { Replies } from "./Replies";

interface CommentProps {
  comment: BaseComment | Reply;
}

function isBaseComment(comment: BaseComment | Reply): comment is BaseComment {
    return (comment as BaseComment).repliesCount !== undefined;
}

export const Comment: React.FC<CommentProps> = ({ 
    comment
}) => {
    const [repliesVisibility, setRepliesVisibility] = useState<'hide' | 'show'>('hide');
    
    return (
        <Flex alignItems='start' gap={2}>
            <Avatar size='sm' name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Box key={comment.id}>
                <Flex alignItems='center' gap={2}>
                    <Heading size='sm'>{comment.author.username}</Heading>
                    <Text fontSize='xs' pt={0.5}>24hr</Text>
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
                    <Text>Reply</Text>
                </Flex>
                {isBaseComment(comment) && repliesVisibility === 'show' && (
                    <Replies parentCommentId={comment.id} />
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
