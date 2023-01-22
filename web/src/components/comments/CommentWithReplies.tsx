import { Box, Button, Divider, Flex, Skeleton, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BaseComment, useRepliesQuery } from '../../gql/graphql';
import { Comment } from './Comment';

interface CommentWithRepliesProps {
  comment: BaseComment;
  onReply: () => void;
}

export const CommentWithReplies: React.FC<CommentWithRepliesProps> = ({ 
    comment, onReply
}) => {
    const [repliesVisibility, setRepliesVisibility] = useState<'hide' | 'show'>(
        'hide'
    );

    const { data, loading, fetchMore } = useRepliesQuery({
        skip: repliesVisibility === 'hide',
        variables: {
            parentCommentId: comment.id,
            options: {
                limit: 2
            }
        },
    })

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
            <Comment comment={comment} onReply={onReply} loading={loading} />
            {repliesVisibility === 'show' && (
                <Stack ml={8} mt={2}>
                {data?.replies.data.map(reply => (
                    <Comment 
                    key={reply.id} 
                    comment={reply} 
                    onReply={onReply} 
                    loading={loading}/>
                ))}
                </Stack>
            )}
            <Skeleton 
            isLoaded={!loading}
            mt={1}
            mb={2}
            height='4'>
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
                        ? `View ${comment.repliesCount - (data?.replies.data.length || 0)} more 
                        ${comment.repliesCount - (data?.replies.data.length || 0) === 1 ? 'reply' : 'replies'}`
                        : 'Hide replies'}
                    </Button>
                </Flex>
            </Skeleton>
        </Box>
    );
};
