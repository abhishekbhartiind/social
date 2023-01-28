import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
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
