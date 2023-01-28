import { MenuItem, MenuItemProps } from '@chakra-ui/menu';
import { useRouter } from 'next/router';
import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useDeletePostMutation } from '../../gql/graphql';

type DeleteMenuItemProps = MenuItemProps & {
    id: string;
}

export const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({ 
    id, ...rest 
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
        <>
        <MenuItem 
        {...rest}
        icon={<RiDeleteBin5Fill size={18}/>}
        onClick={(_) => handleDeletePost(id)}
        >
            Delete post
        </MenuItem>
        </>
    )
};