import { ApolloCache, gql } from '@apollo/client';
import { IconButton, IconButtonProps } from '@chakra-ui/button';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

type LikeButtonProps<T> = IconButtonProps & {
    isLiked?: T;
    iconSize: number;
    onLike: () => void;
}

export const updateCacheAfterLike = <T extends Record<string, any>>(
    id: string,
    cache: ApolloCache<T>,
    type: 'BaseComment' | 'Reply' | 'Post'
) => {
    cache.updateFragment<{ 
        isLiked: boolean | null,
        likeCount: number, 
    }>({
        id: `${type}:` + id,
        fragment: gql`
            fragment _ on ${type} {
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

export const LikeButton = <T extends any>({ 
    isLiked, iconSize, onLike, ...rest
}: LikeButtonProps<T>) => {
    
    const Icon = isLiked ? AiFillLike : AiOutlineLike;

    return (
        <IconButton
            {...rest}
            variant='unstyled'
            color='red'
            icon={<Icon size={iconSize}/>}
            onClick={onLike}
        />
    )
}