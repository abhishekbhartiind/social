import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from './InputField';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { CommentPostMutation, useCommentPostMutation } from '../gql/graphql';
import { ApolloCache, gql } from '@apollo/client';

interface AddCommentProps {
    postId: string;
    parentCommentId?: string;
    parentCommentAuthor?: string;
    onSuccess: () => void;
}

const updateCacheAfterComment = (
    postId: string, 
    cache: ApolloCache<CommentPostMutation>,
    parentCommentId?: string
) => {
    cache.updateFragment<{ commentCount: number }>({
        id: "Post:" + postId,
        fragment: gql`
            fragment _ on Post {
                commentCount
            }
        `
    }, 
    (data) => {
        if (data) {
            return {
                ...data,
                commentCount: data.commentCount + 1,
            }
        } 
        return data;
    });
    const evictOptions: Record<string, string> = { 
        fieldName: parentCommentId ? 'replies' : 'baseComments' };
    cache.evict(evictOptions);
    cache.gc();
}

export const AddComment: React.FC<AddCommentProps> = ({ 
    postId, parentCommentAuthor, parentCommentId, onSuccess
}) => {
    const methods = useForm<{ content: string }>({
        values: {
            content: parentCommentAuthor ? '@' + parentCommentAuthor : '',
        }
    });
    const [commentPost] = useCommentPostMutation();

    const onSubmit: SubmitHandler<{ content: string }> = async (
        values 
    ) => {
        if (!postId) {
            return;
        }
        let parentId: string | undefined = parentCommentId;
        if (parentCommentId && 
            !(new RegExp(`^@${parentCommentAuthor}`, 'i')).test(values.content)) {
            parentId = undefined;
        }
        await commentPost({
            variables: {
                postId,
                ...values,
                parentId
            },
            update: (cache) => updateCacheAfterComment(postId, cache),
        });
        methods.resetField('content');
        onSuccess();
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Flex 
                py={1}
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
                        rounded: 'md'
                    }}>
                        <InputField
                            _focus={{
                                ring: 0,
                                border: 'none'
                            }}
                            rounded='none'
                            roundedLeft='md'
                            type='text'
                            name='content'
                            placeholder='Enter comment' />
                        <IconButton
                            rounded='none'
                            roundedRight='md'
                            colorScheme='green'
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