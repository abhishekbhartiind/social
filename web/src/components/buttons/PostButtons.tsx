import { Flex } from "@chakra-ui/react";
import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import LikeButton from "./LikeButton";

interface PostButtonsProps<T> {
    isLiked?: T;
    id: string;
    iconSize: number;
    variant?: 'row' | 'column';
    hidden?: boolean;
}

const PostButtons = <T extends any>({
    isLiked,
    id,
    iconSize,
    variant='row',
    hidden
}: PostButtonsProps<T>) => {
    return (
        <Flex ml="auto" direction={variant}>
            <LikeButton
                aria-label="Like/Dislike Post"
                id={id}
                iconSize={iconSize} 
                isLiked={isLiked}
            />
            {!hidden && (
                <>
                <EditButton 
                    aria-label="Edit Post"
                    id={id} 
                    iconSize={iconSize} />
                <DeleteButton 
                    aria-label="Delete Post"
                    id={id} 
                    iconSize={iconSize} />
                </>
            )}
        </Flex>
    );
};

export default PostButtons;