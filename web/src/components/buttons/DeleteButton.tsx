import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDeletePostMutation } from '../../gql/graphql';

type DeleteButtonProps = IconButtonProps & {
    id: string;
    iconSize: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ 
    id, iconSize, ...rest 
}) => {
    const router = useRouter();
    const [deletePost] = useDeletePostMutation();

    const handleDeletePost = async (id: string) => {
        await deletePost({
            variables: { postId: id },
            update: (cache) => {
                cache.evict({ id: 'Post:' + id })
            }
        });
        router.push('/');
    };
    
    return (
        <IconButton
            {...rest}
            variant='ghost'
            colorScheme='red'
            icon={<RiDeleteBin5Fill size={iconSize}/>}
            onClick={() => handleDeletePost(id)}
        />
    )
}

export default DeleteButton;