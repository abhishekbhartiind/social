import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri'

type EditMenuItemProps = MenuItemProps & {
    id: string;
}

export const EditMenuItem: React.FC<EditMenuItemProps> = ({ 
    id, ...rest
}) => {
    return (
        <>
        <MenuItem 
        {...rest}
        icon={<RiEdit2Fill size={18}/>}
        as={NextLink}
        href={`/post/${id}`}
        >
            Edit post
        </MenuItem>
        </>
    )
};