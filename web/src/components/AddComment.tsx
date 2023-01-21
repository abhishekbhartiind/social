import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from './InputField';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { Comment, CommentPostMutation, useCommentPostMutation } from '../gql/graphql';
import { ApolloCache, gql } from '@apollo/client';

interface AddCommentProps {
    postId: string;
    onAddComment: (comment: Comment) => void;
}

const updateCacheAfterComment = (
    postId: string, 
    cache: ApolloCache<CommentPostMutation>
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
    })
}

export const AddComment: React.FC<AddCommentProps> = ({ postId, onAddComment }) => {
    const methods = useForm<{ content: string }>();
    const [commentPost] = useCommentPostMutation();

    const onSubmit: SubmitHandler<{ content: string }> = async (
        values 
    ) => {
        const newComment = await commentPost({
            variables: {
                postId,
                ...values,
            },
            update: (cache) => updateCacheAfterComment(postId, cache),
        });
        onAddComment(newComment.data?.commentPost as Comment);
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