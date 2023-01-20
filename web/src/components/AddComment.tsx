import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from './InputField';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';

interface AddCommentProps {

}

export const AddComment: React.FC<AddCommentProps> = ({}) => {
    const methods = useForm<{ content: string }>();

    const onSubmit: SubmitHandler<{ content: string }> = async (
        values 
    ) => {
        console.log(values)
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