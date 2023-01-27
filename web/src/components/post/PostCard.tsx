import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import { Post } from "../../gql/graphql";
import { LikePostButton } from "../buttons/LikePostButton";
import { EditDeleteMenu } from "../EditDeleteMenu";
import PostDescription from "./PostDescription";

interface PostCardProps<T> {
  post: T;
  meId?: string;
  loading: boolean;
}

const PostCard = <T extends Post>({
    post,
    meId,
    loading,
}: PostCardProps<T>) => (
    <Card maxW="md" boxShadow="xl">
        <CardHeader p={4}>
            <Flex flex="1" gap={4} alignItems="center" flexWrap="wrap" mb={2}>
                <SkeletonCircle isLoaded={!loading} size="10">
                <Avatar name={post.creator.username} src="" />
                </SkeletonCircle>
                <SkeletonText
                pt={2}
                isLoaded={!loading}
                noOfLines={2}
                alignItems="center"
                skeletonHeight="3"
                >
                <Heading size="sm" textTransform="uppercase">
                    {post.creator.username}
                </Heading>
                <Text fontSize="sm">
                    {formatDistanceToNow(new Date(parseInt(post.createdAt)), {
                    addSuffix: true,
                    })}
                </Text>
                </SkeletonText>
                {meId === post.creatorId && (
                <Box ml="auto">
                    <Skeleton isLoaded={!loading}>
                    <EditDeleteMenu id={post.id} />
                    </Skeleton>
                </Box>
                )}
            </Flex>
        </CardHeader>
        <LinkBox as="div">
            <Skeleton isLoaded={!loading} fadeDuration={1}>
                <LinkOverlay as={NextLink} href={`/post/${post.id}`}>
                    <Image
                        objectFit="cover"
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Chakra UI"
                        />
                </LinkOverlay>
            </Skeleton>
        </LinkBox>
        <CardBody px={4}>
            <Skeleton isLoaded={!loading} mb={4} height="6" fadeDuration={2}>
                <LikePostButton
                aria-label="Like post"
                isLiked={post.isLiked}
                iconSize={28}
                id={post.id}
                />
            </Skeleton>
            <SkeletonText
                isLoaded={!loading}
                noOfLines={2}
                skeletonHeight="4"
                fadeDuration={2.5}
            >
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                {post.likeCount} likes &nbsp; {post.commentCount} comments
                </Text>
                <PostDescription
                    username={post.creator.username}
                    textSnippet={post.textSnippet}
                    fullText={post.text}
                />
            </SkeletonText>
        </CardBody>
    </Card>
);

export default PostCard;
