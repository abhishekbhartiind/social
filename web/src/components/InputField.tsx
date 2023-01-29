import { Flex } from '@chakra-ui/layout';
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { EditableInput, Editable, EditablePreview } from "@chakra-ui/editable";
import { Tooltip } from "@chakra-ui/tooltip";
import { Textarea } from "@chakra-ui/textarea";
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { MdError } from 'react-icons/md';

type InputVariant = 'input' | 'textarea' | 'editableInput';

type InputFieldProps = InputProps & {
    name: string;
    minLength?: number;
    label?: string;
    inputVariant?: InputVariant;
}

function renderCorrectVariant(variant: InputVariant) {
    switch(variant) {
        case 'editableInput': return EditableInput;
        case 'textarea': return Textarea;
        default: return Input;
    }
}

const InputField = ({
    inputVariant='input',
    label,
    name,
    variant,
    ...rest
}: InputFieldProps) => {
    const { register, formState: { errors }, getValues } = useFormContext<Record<string, string>>();

    const values = getValues();

    return (
        <FormControl isInvalid={!!errors[name]}>
            <Flex direction='column' position='relative'>
                {label && inputVariant !== 'editableInput' && 
                    <FormLabel htmlFor={name}>{label}</FormLabel>}
                {inputVariant === 'editableInput' ?
                <Editable
                width='full'
                defaultValue={values[name]}
                borderBottom='2px'
                borderColor='gray.500'>
                    <EditablePreview width='full'/>
                    <Input
                        as={renderCorrectVariant(inputVariant)}
                        variant={variant}
                        id={name}
                        {...rest}
                        {...register(name)} />
                </Editable>
                : <Input
                    as={renderCorrectVariant(inputVariant)}
                    id={name}
                    {...rest}
                    {...register(name)}
                />}
                {errors[name] && 
                <FormErrorMessage 
                position='absolute' 
                right={1}
                top={0}
                zIndex={1}>
                    <Tooltip 
                    hasArrow
                    placement='top'
                    label={errors[name]?.message || 'invalid input!'} 
                    fontSize='sm'>
                        <span>
                            <MdError size={20}/>
                        </span>
                    </Tooltip>
                </FormErrorMessage>}
            </Flex>
        </FormControl>
    )
}

export default React.memo(InputField);