import { ApolloCache } from '@apollo/client';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useCommentContext } from '../context/CommentContext';
import { CommentPostMutation, useCommentPostMutation } from '../gql/graphql';
import { updateCommentCountInCache, updateRepliesCountInCache } from '../utils/updateCache';
import { useToxicTextDetector } from '../utils/useToxicTextDetector';
import InputField from './InputField';

interface AddCommentProps {
    postId: string;
}

const updateCacheAfterComment = (
    postId: string, 
    cache: ApolloCache<CommentPostMutation>,
    parentCommentId?: string
) => {
    updateCommentCountInCache(cache, postId, 'UP', 1);

    if (parentCommentId) {
        updateRepliesCountInCache(cache, parentCommentId, 'UP', 1);
    }

    const evictOptions: Record<string, string> = { 
        fieldName: parentCommentId ? 'replies' : 'baseComments' };
    cache.evict(evictOptions);
    cache.gc();
}

export const AddComment: React.FC<AddCommentProps> = ({ 
    postId
}) => {
    const { parentComment, onSetParentComment } = useCommentContext();
    const methods = useForm<{ content: string }>();
    const [commentPost] = useCommentPostMutation();

    const { getWarningForToxicText } = useToxicTextDetector();

    const onSubmit: SubmitHandler<{ content: string }> = async (
        values 
    ) => {
        if (!postId) {
            return;
        }
        const toxicContent = await getWarningForToxicText(values.content);
        if (toxicContent) {
            methods.setError('content', { type: 'custom', message: toxicContent });
            return;
        }
        await commentPost({
            variables: {
                postId,
                ...values,
                parentId: parentComment?.id,
            },
            update: (cache) => 
                updateCacheAfterComment(postId, cache, parentComment?.id),
        });
        methods.resetField('content');
        onSetParentComment(null);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Flex 
                alignItems='center'
                >
                    <Avatar 
                        size={'sm'}
                        mr={2}
                        name={'Hello Kitty'} 
                        src=''/>
                    <Flex
                    flex={1}
                    alignItems='center'
                    _focusWithin={{
                        ring: 2,
                        rounded: 'full'
                    }}>
                        <Flex alignItems='center' flex={1}>
                            {parentComment && (
                                <Flex 
                                alignSelf='stretch'
                                px={2}
                                alignItems='center'
                                roundedLeft='full'
                                bgColor='green' 
                                color='white'>
                                    @{parentComment.author}
                                </Flex>
                            )}
                            <InputField
                                _focus={{
                                    ring: 0,
                                    border: 'none'
                                }}
                                rounded='none'
                                roundedLeft={parentComment ? 'none' : 'full'}
                                type='text'
                                name='content'
                                placeholder='Enter comment' />
                        </Flex>
                        <IconButton
                            rounded='none'
                            roundedRight='full'
                            bgColor='green'
                            color='white'
                            aria-label='Add Comment'
                            type='submit'>
                            <AiOutlineSend />
                        </IconButton>
                    </Flex>
                </Flex>
            </form>
        </FormProvider>
    )
}