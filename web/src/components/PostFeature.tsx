import { Heading, Box, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import PostButtons from "./buttons/PostButtons";

interface PostFeatureProps<T> {
    post: T;
    meId?: string;
}

export const PostFeature = <T extends Record<string, any>>({
    post,
    meId,
}: PostFeatureProps<T>) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" gap={2}>
            <Box mx='auto'>
                <Link as={NextLink} href={`/post/${post.id}`}>
                    <Heading fontSize="xl">{post.title}</Heading>
                </Link>
                <Text my={4}>{post.text}</Text>
            </Box>
            <Box ml='auto'>
                <PostButtons
                    isLiked={post.isLiked}
                    id={post.id} 
                    iconSize={20} 
                    variant="row" 
                    hidden={meId && meId === post.creatorId ? false : true} />
            </Box>
        </Box>
    );
};
