import { Avatar, Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import LikeButton from "../../components/buttons/LikeButton";
import { EditDeleteMenu } from "../../components/EditDeleteMenu";
import Layout from "../../components/Layout";
import { CommentSection } from "../../components/post/CommentSection";
import { useMeQuery, usePostQuery } from "../../gql/graphql";
import withApollo from "../../utils/withApollo";

const Post: React.FC<{}> = ({}) => {
    const router = useRouter();
    const postId = typeof router.query.id === "string" ? router.query.id : "";

    const { data: meData } = useMeQuery();
    const { data, loading, error } = usePostQuery({
        skip: postId === "",
        variables: {
            postId,
        },
    });

    if (loading) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data?.post) {
        return (
            <Layout>
                <div>cannot find post</div>
            </Layout>
        );
    }

    return (
        <Layout home={false}>
            <Flex 
                flex="1" 
                gap={4}
                alignItems="center" 
                flexWrap="wrap"
                mb={2}>
                <Avatar name={data.post.creator.username} src="" />
                <Stack spacing={1}>
                    <Heading size="sm" textTransform="uppercase">
                        {data.post.creator.username}
                    </Heading>
                    <Text fontSize='sm'>
                    {formatDistanceToNow(new Date(parseInt(data.post.createdAt)), {
                        addSuffix: true,
                    })}
                    </Text>
                </Stack>
                {meData?.me?.id === data.post.creatorId && 
                (<Box ml='auto' >
                    <EditDeleteMenu id={data.post.id} />
                </Box>)}
            </Flex>
            <Text my={4}>
                {data.post.text}
            </Text>
            <Image
                objectFit="cover"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Chakra UI"
                mb={2}
            />
            <Flex alignItems='center' mb={2}>
                <LikeButton 
                    aria-label='Like post'
                    isLiked={data.post.isLiked}
                    iconSize={28}
                    id={data.post.id} />
                <Text fontSize='sm' fontWeight='bold' ml='auto'>
                    {data.post.likeCount} likes 
                    &nbsp; {data.post.commentCount} comments
                </Text>
            </Flex>
            <CommentSection
                postId={data.post.id} />
        </Layout>
    );
};

export default withApollo({ ssr: false })(Post);
