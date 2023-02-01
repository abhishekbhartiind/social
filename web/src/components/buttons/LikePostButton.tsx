import { useToast } from '@chakra-ui/toast';
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
    const toast = useToast();
    const [likePost] = useLikePostMutation();

    const handleLikePost = async (id: string) => {
        try {
            await likePost({
                variables: { postId: id },
                update: (cache) => updateCacheAfterLike(id, cache, 'Post')
            });
        } catch (error) {
            toast({
                position: 'top',
                description: 'not authenticated',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <LikeButton 
            aria-label='Like Post'
            isLiked={isLiked} 
            iconSize={iconSize} 
            onLike={() => handleLikePost(id)} />
    )
}