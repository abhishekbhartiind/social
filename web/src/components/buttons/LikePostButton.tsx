import { useLikePostMutation } from '../../gql/graphql';
import { LikeButton, updateCacheAfterLike } from './LikeButton';

type LikeButtonProps<T> = {
    isLiked?: T,
    id: string;
    iconSize: number;
}

export const LikePostButton = <T extends any>({ 
    isLiked, id, iconSize
}: LikeButtonProps<T>) => {
    const [likePost] = useLikePostMutation();

    const handleLikePost = async (id: string) => {
        await likePost({
            variables: { postId: id },
            update: (cache) => updateCacheAfterLike(id, cache, 'Post')
        });
    };

    return (
        <LikeButton 
            aria-label='Like Post'
            isLiked={isLiked} 
            iconSize={iconSize} 
            onLike={() => handleLikePost(id)} />
    )
}