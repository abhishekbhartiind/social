import { Button, Flex } from "@chakra-ui/react";
import React from "react";

interface LoadMoreButtonProps {
    loading: boolean,
    onLoadMore: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
    loading, onLoadMore
}) => {
    return (
        <Flex>
            <Button 
            boxShadow='md'
            colorScheme='green'
            isLoading={loading} 
            width='full' 
            my={8} 
            onClick={onLoadMore}>
                Load more posts
            </Button>
        </Flex>
    );
};
