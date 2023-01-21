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
            isLoading={loading} 
            m="auto" 
            my={8} 
            onClick={onLoadMore}>
                load more
            </Button>
        </Flex>
    );
};
