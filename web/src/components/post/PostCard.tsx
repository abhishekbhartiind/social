import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Img } from "@chakra-ui/image";
import { Box, Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
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
}: PostCardProps<T>) => {
  return (
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
                <Img
                w="full"
                height="150px"
                bgColor="fuchsia"
                objectFit="cover"
                src={post.imageLinks[0]}
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
};

export default PostCard;
