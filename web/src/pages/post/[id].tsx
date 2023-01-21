import { Avatar, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import PostButtons from "../../components/buttons/PostButtons";
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
                gap="4" 
                alignItems="center" 
                flexWrap="wrap"
                mb={2}>
                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                <Heading size="sm" textTransform="uppercase">
                    {data.post.creator.username}
                </Heading>
                <Text ml='auto'>
                {formatDistanceToNow(new Date(parseInt(data.post.createdAt)), {
                    addSuffix: true,
                })}
                </Text>
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
            <Flex alignItems='center' gap={2}>
                <Text fontWeight='bold' mb={2}>{data.post.likeCount} likes</Text>
                <Text fontWeight='bold' mb={2}>{data.post.commentCount} comments</Text>
            </Flex>
            <PostButtons
                isLiked={data.post.isLiked}
                id={data.post.id} 
                iconSize={28} 
                variant="row" 
                hidden={meData?.me && meData.me.id === data.post.creatorId ? false : true} />
            <CommentSection
                postId={data.post.id} />
        </Layout>
    );
};

export default withApollo({ ssr: false })(Post);
