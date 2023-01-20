import { FormControl, FormLabel, Input, FormErrorMessage, InputProps, Textarea } from '@chakra-ui/react';
import React from 'react'
import { useFormContext } from 'react-hook-form';

type InputFieldProps = InputProps & {
    label?: string,
    name: string,
    minLength?: number,
    textArea?: boolean,
}

const InputField = ({
    label,
    name,
    textArea,
    ...rest
}: InputFieldProps) => {
    const { register, formState: { errors } } = useFormContext<Record<string, string>>();

    let InputOrTextarea: any = Input;
    if (textArea) {
        InputOrTextarea = Textarea;
    }

    return (
        <FormControl isInvalid={!!errors[name]}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputOrTextarea
                id={name}
                {...rest}
                {...register(name)}
            />
            <FormErrorMessage>
                {errors[name] && errors[name]?.message}
            </FormErrorMessage>
        </FormControl>
    )
}

export default React.memo(InputField);