import { Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useToxicTextDetector } from "../../utils/useToxicTextDetector";
import InputField from "../InputField";

type CommentContentProps = {
    defaultValue: string;
    iconSize: number;
    isEditing: boolean;
    onEdit: (content: string, isChanged: boolean) => void;
}

export const CommentContent: React.FC<CommentContentProps> = ({
    defaultValue, iconSize, isEditing, onEdit
}) => {
    const { getWarningForToxicText } = useToxicTextDetector();

    const methods = useForm<{ content: string }>({
        defaultValues: {
            content: defaultValue,
        }
    });
    
    const onSubmit: SubmitHandler<{ content: string }> = async (values) => {
        if (!values.content) return;
        const toxicContent = await getWarningForToxicText(values.content);
        if (toxicContent) {
            methods.setError('content', { type: 'custom', message: toxicContent });
            return;
        }
        onEdit(values.content, values.content === defaultValue);
    }

    return (
        <Flex gap={2}>
            {isEditing ? (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Flex alignItems='center' gap={1}>
                            <InputField
                                name='content'
                                variant='flushed' />
                            <IconButton 
                                size="xs"
                                aria-label="Submit new comment"
                                isLoading={methods.formState.isSubmitting}
                                icon={<AiOutlineCheck size={iconSize}/>} 
                                type='submit'/>
                            <IconButton 
                                size="xs"
                                aria-label="Stop editing comment"
                                icon={<AiOutlineClose size={iconSize}/>} 
                                type='button'
                                onClick={() => onEdit('', false)}/>
                        </Flex>
                    </form>
                </FormProvider>
            ) : (
                <>
                    <Text>{defaultValue}</Text>
                </>
            )}
        </Flex>
    );
};
