import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { formatDistanceToNow } from "date-fns";
import { MouseEventHandler, useState } from "react";
import { Post } from "../../gql/graphql";
import { AddComment } from "../AddComment";
import PostButtons from "../buttons/PostButtons";
import PostDescription from "./PostDescription";

interface PostCardProps<T> {
    post: T;
    meId?: string;
}

const PostCard = <T extends Post>({
    post,
    meId
}: PostCardProps<T>) => {
    const [commentForm, setCommentForm] = useState<'hide' | 'show'>('hide');
    
    const handleComment: MouseEventHandler<HTMLButtonElement> = 
    (_) => {
        setCommentForm(commentForm === 'hide' ? 'show' : 'hide');
    }

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
            <CardBody px={[3, 4]}>
                <PostButtons
                    isLiked={post.isLiked}
                    id={post.id} 
                    iconSize={20} 
                    variant="row" 
                    hidden={meId && meId === post.creatorId ? false : true}
                    onComment={handleComment} />
                <Text fontWeight='bold' mb={2}>{post.likeCount} likes</Text>
                <PostDescription
                    username={post.creator.username}
                    textSnippet={post.textSnippet}
                    fullText={post.text}
                />
                {post.commentCount > 0 && <Text mt={2}>View all {post.commentCount} comments</Text>}
                <Text>{formatDistanceToNow(new Date(parseInt(post.createdAt)), {
                    addSuffix: true,
                })}</Text>
                {commentForm === 'show' && (
                    <Box mt={2}>
                        <AddComment />
                    </Box>
                )}
            </CardBody>
        </Card>
    );
};

export default PostCard;