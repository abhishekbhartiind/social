import { Box, Button, Divider, Flex, Skeleton, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRepliesQuery } from '../../gql/graphql';
import { Comment } from './Comment';

interface RepliesProps {
    parentId: string;
    parentRepliesCount: number;
}

export const Replies: React.FC<RepliesProps> = ({ 
    parentId, parentRepliesCount
}) => {
    const [repliesVisibility, setRepliesVisibility] = useState<'hide' | 'show'>(
        'hide'
    );

    const { data, loading, fetchMore } = useRepliesQuery({
        skip: repliesVisibility === 'hide',
        variables: {
            parentCommentId: parentId,
            options: {
                limit: 2
            }
        },
    })

    const remainingRepliesCount = parentRepliesCount - (data?.replies.data.length || 0);

    const handleLoadMore = () => {
        if (data) {
            const replies = data.replies.data;
            const length = replies.length;
            fetchMore({
                variables: {
                    options: {
                        limit: 2,
                        cursor: replies[length - 1].createdAt,
                    }
                }
            });
        }
    }

    const handleViewReply = () => {
        if (repliesVisibility === 'hide') {
            setRepliesVisibility('show');
        } else if (repliesVisibility === 'show' && data?.replies.hasMore) {
            handleLoadMore();
        } else { 
            setRepliesVisibility('hide');
        }
    };

    return (
        <Box>
            {repliesVisibility === 'show' && (
                <Stack ml={8} mt={2}>
                {data?.replies.data.map(reply => (
                    <Comment 
                    key={reply.id} 
                    comment={reply} 
                    loading={loading}
                    parentId={parentId}/>
                ))}
                </Stack>
            )}
            <Skeleton isLoaded={!loading}>
                <Flex alignItems='center' color='gray.500'>
                    <Divider borderColor='gray' maxW='16' />
                    <Button
                        variant='unstyled'
                        ml={2}
                        type='button'
                        fontSize='sm'
                        onClick={handleViewReply}
                    >
                        {repliesVisibility === 'hide' || data?.replies.hasMore 
                        ? `View ${remainingRepliesCount} more 
                        ${remainingRepliesCount === 1 ? 'reply' : 'replies'}`
                        : 'Hide replies'}
                    </Button>
                </Flex>
            </Skeleton>
        </Box>
    );
};
