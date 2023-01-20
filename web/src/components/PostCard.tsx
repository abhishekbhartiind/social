import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Flex, Heading, Text, Badge } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import PostButtons from "./buttons/PostButtons";
import { useState } from "react";

interface PostCardProps<T> {
    post: T;
    meId?: string;
}

export const PostCard = <T extends Record<string, any>>({
    post,
    meId
}: PostCardProps<T>) => {
    const [textVisibility, setTextVisibility] = useState<'snippet' | 'full'>('snippet');
    
    return (
        <Card maxW="md" boxShadow='lg'>
            <CardHeader>
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
            <CardBody>
                <Text fontWeight='bold' mb={2}>{post.likeCount} likes</Text>
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
            </CardBody>
            <CardFooter>
                <PostButtons
                    isLiked={post.isLiked}
                    id={post.id} 
                    iconSize={20} 
                    variant="row" 
                    hidden={meId && meId === post.creatorId ? false : true} />
            </CardFooter>
        </Card>
    );
};
