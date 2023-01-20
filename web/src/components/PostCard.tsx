import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { Post } from "../gql/graphql";
import PostButtons from "./buttons/PostButtons";

interface PostCardProps<T> {
    post: T;
    meId?: string;
}

export const PostCard = <T extends Post>({
    post,
    meId
}: PostCardProps<T>) => {
    const [textVisibility, setTextVisibility] = useState<'snippet' | 'full'>('snippet');
    
    return (
        <Card maxW="md" boxShadow='lg'>
            <CardHeader p={[2, 4]}>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                    <Heading size="sm" textTransform='uppercase'>{post.creator.username}</Heading>
                </Flex>
            </CardHeader>
            <Image
                objectFit="cover"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Chakra UI"
            />
            <CardBody p={[3, 4]} pb={0}>
                <Text fontWeight='bold' mb={2}>{post.likeCount} likes</Text>
                <Box mb={4}>
                {textVisibility === 'snippet' ? 
                <Text>
                    {post.textSnippet} &nbsp;
                    <Badge 
                    mr={2}
                    cursor='pointer'
                    onClick={() => setTextVisibility('full')}>more</Badge>
                </Text> : 
                <Text>
                    {post.text} &nbsp;
                    <Badge 
                    cursor='pointer'
                    onClick={() => setTextVisibility('snippet')}>less</Badge>
                </Text>}
                </Box>
                {post.commentCount > 0 && <Text mt={2}>View all {post.commentCount} comments</Text>}
            </CardBody>
            <CardFooter p={[3, 4]}>
                <Flex width='100%' alignItems='center' justifyContent='space-evenly'>
                <Text>{(new Date(parseInt(post.createdAt))).toDateString()}</Text>
                <PostButtons
                    isLiked={post.isLiked}
                    id={post.id} 
                    iconSize={20} 
                    variant="row" 
                    hidden={meId && meId === post.creatorId ? false : true} />
                </Flex>
            </CardFooter>
        </Card>
    );
};
