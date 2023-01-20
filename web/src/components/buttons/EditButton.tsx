import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import NextLink from 'next/link'

type EditButtonProps = IconButtonProps & {
    id: string;
    iconSize: number;
}

const EditButton: React.FC<EditButtonProps> = ({ 
    id, iconSize, ...rest 
}) => {
    return (
        <IconButton
            variant='ghost'
            as={NextLink}
            colorScheme='green'
            href={`/post/edit/${id}`}
            icon={<RiEdit2Fill size={iconSize}/>}
            {...rest}
        />
    )
}

export default EditButton;