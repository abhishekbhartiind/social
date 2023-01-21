import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Box, Stack } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import { Post } from "../../gql/graphql";
import LikeButton from "../buttons/LikeButton";
import { EditDeleteMenu } from "../EditDeleteMenu";
import PostDescription from "./PostDescription";

interface PostCardProps<T> {
  post: T;
  meId?: string;
}

const PostCard = <T extends Post>({ post, meId }: PostCardProps<T>) => (
    <Card maxW="md" boxShadow="xl">
        <CardHeader p={4}>
            <Flex flex="1" gap={4} alignItems="center" flexWrap="wrap" mb={2}>
                <Avatar name={post.creator.username} src="" />
                <Stack spacing={1}>
                <Heading size="sm" textTransform="uppercase">
                    {post.creator.username}
                </Heading>
                <Text fontSize="sm">
                    {formatDistanceToNow(new Date(parseInt(post.createdAt)), {
                    addSuffix: true,
                    })}
                </Text>
                </Stack>
                {meId === post.creatorId && (
                <Box ml="auto">
                    <EditDeleteMenu id={post.id} />
                </Box>
                )}
            </Flex>
        </CardHeader>
        <LinkBox as='div'>
            <Image
            objectFit="cover"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Chakra UI"
            />
            <CardBody px={4}>
            <LikeButton
                aria-label="Like post"
                isLiked={post.isLiked}
                iconSize={28}
                id={post.id}
            />
            <Text fontSize="sm" fontWeight="bold" mb={2}>
                {post.likeCount} likes &nbsp; {post.commentCount} comments
            </Text>
            <LinkOverlay as={NextLink} href={`/post/${post.id}`}>
                <PostDescription
                username={post.creator.username}
                textSnippet={post.textSnippet}
                fullText={post.text}
                />
            </LinkOverlay>
            </CardBody>
        </LinkBox>
    </Card>
);

export default PostCard;
