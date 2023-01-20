import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'
type CommentButtonProps = IconButtonProps & {
    iconSize: number;
}

const CommentButton: React.FC<CommentButtonProps> = ({ 
    iconSize, ...rest
}) => {
    return (
        <IconButton
            variant='ghost'
            colorScheme='green'
            icon={<FaRegComment size={iconSize}/>}
            {...rest}
        />
    )
}

export default CommentButton;