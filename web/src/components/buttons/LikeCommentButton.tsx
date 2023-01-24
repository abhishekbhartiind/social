import { useLikeCommentMutation } from '../../gql/graphql';
import { LikeButton, updateCacheAfterLike } from './LikeButton';

type LikeButtonProps<T> = {
    isLiked?: T,
    id: string;
    iconSize: number;
    type: 'BaseComment' | 'Reply'
}

export const LikeCommentButton = <T extends any>({ 
    isLiked, id, iconSize, type
}: LikeButtonProps<T>) => {
    const [likeComment] = useLikeCommentMutation();

    const handleLikeComment = async (id: string) => {
        await likeComment({
            variables: { commentId: id },
            update: (cache) => updateCacheAfterLike(id, cache, type)
        });
    };

    return (
        <LikeButton 
            aria-label='Like Comment'
            isLiked={isLiked} 
            iconSize={iconSize} 
            onLike={() => handleLikeComment(id)} />
    )
}