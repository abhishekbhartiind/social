import { ApolloCache, gql } from '@apollo/client';
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { LikePostMutation, useLikePostMutation } from '../../gql/graphql';

type LikeButtonProps = IconButtonProps & {
    isLiked?: boolean,
    id: string;
    iconSize: number;
}

const updateCacheAfterLike = (
    id: string,
    cache: ApolloCache<LikePostMutation>
) => {
    cache.updateFragment<{ isLiked: boolean | null }>({
        id: "Post:" + id,
        fragment: gql`
            fragment _ on Post {
                isLiked
            }
        `
    }, 
    (data) => {
        return { ...data, isLiked: !data?.isLiked };
    });
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
    isLiked, id, iconSize, ...rest 
}) => {
    const [likePost] = useLikePostMutation();

    const handleLikePost = async (id: string) => {
        await likePost({
            variables: { postId: id },
            update: (cache) => updateCacheAfterLike(id, cache)
        });
    };
    
    const Icon = isLiked ? AiFillDislike : AiFillLike;

    return (
        <IconButton
            {...rest}
            variant='ghost'
            colorScheme='red'
            icon={<Icon size={iconSize}/>}
            onClick={() => handleLikePost(id)}
        />
    )
}

export default LikeButton;