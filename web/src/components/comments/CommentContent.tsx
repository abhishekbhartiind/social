import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";

type CommentContentProps = {
    defaultValue: string;
    iconSize: number;
    isEditing: boolean;
    onEdit: (content: string) => void;
}

export const CommentContent: React.FC<CommentContentProps> = ({
    defaultValue, iconSize, isEditing, onEdit
}) => {
    const { register, handleSubmit } = useForm<{ content: string }>({
        defaultValues: {
            content: defaultValue,
        }
    });
    
    const onSubmit: SubmitHandler<{ content: string }> = (values) => {
        onEdit(values.content);
    }

    return (
        <Flex gap={2}>
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex alignItems='center' gap={1}>
                        <Input {...register('content')} variant='flushed' />
                        <IconButton 
                            size="xs"
                            aria-label="Submit new comment"
                            icon={<AiOutlineCheck size={iconSize}/>} 
                            type='submit'/>
                    </Flex>
                </form>
            ) : (
                <>
                    <Text>{defaultValue}</Text>
                </>
            )}
        </Flex>
    );
};
