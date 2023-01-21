import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useRepliesQuery } from '../../gql/graphql';
import { Comment } from './Comment';

interface RepliesProps {
    parentCommentId: string;
}

export const Replies: React.FC<RepliesProps> = ({ 
    parentCommentId
}) => {
    const { data } = useRepliesQuery({
        variables: {
            parentCommentId,
        }
    })

    return (
        <Stack mt={2}>
            {data?.replies.map(reply => (
                <Comment comment={reply} />
            ))}
        </Stack>
    );
}