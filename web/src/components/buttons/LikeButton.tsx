import { ApolloCache, gql } from '@apollo/client';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { LikePostMutation, useLikePostMutation } from '../../gql/graphql';

type LikeButtonProps<T> = IconButtonProps & {
    isLiked?: T,
    id: string;
    iconSize: number;
}

const updateCacheAfterLike = (
    id: string,
    cache: ApolloCache<LikePostMutation>
) => {
    cache.updateFragment<{ 
        isLiked: boolean | null,
        likeCount: number, 
    }>({
        id: "Post:" + id,
        fragment: gql`
            fragment _ on Post {
                isLiked
                likeCount
            }
        `
    }, 
    (data) => {
        if (data) {
            const newIsLiked = !data.isLiked;
            let newLikeCount = data.likeCount;
            if (data.isLiked) {
                newLikeCount -= 1;
            } else {
                newLikeCount += 1;
            }
            return { 
                ...data, 
                isLiked: newIsLiked,
                likeCount: newLikeCount,
            };
        }
        return data;
    });
}

const LikeButton = <T extends any>({ 
    isLiked, id, iconSize, ...rest 
}: LikeButtonProps<T>) => {
    const [likePost] = useLikePostMutation();

    const handleLikePost = async (id: string) => {
        await likePost({
            variables: { postId: id },
            update: (cache) => updateCacheAfterLike(id, cache)
        });
    };
    
    const Icon = isLiked ? AiFillLike : AiOutlineLike;

    return (
        <IconButton
            {...rest}
            variant='unstyled'
            color='red'
            width='fit-content'
            icon={<Icon size={iconSize}/>}
            onClick={() => handleLikePost(id)}
        />
    )
}

export default LikeButton;