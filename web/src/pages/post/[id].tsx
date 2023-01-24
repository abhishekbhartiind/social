import { Avatar, Box, Divider, Flex, Heading, Image, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { LikePostButton } from "../../components/buttons/LikePostButton";
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

    if (error) {
        return <Layout><div>{error.message}</div></Layout>;
    }

    if (!data?.post) {
        return <Layout><div>Cannot find post</div></Layout>;
    }

    return (
        <Layout home={false}>
            <Flex 
                flex="1" 
                gap={2}
                alignItems="center" 
                flexWrap="wrap"
                mb={2}>
                    <SkeletonCircle 
                    isLoaded={!loading}
                    size='14'>
                        <Avatar name={data.post.creator.username} src="" />
                    </SkeletonCircle>
                        <SkeletonText 
                        isLoaded={!loading}
                        noOfLines={2} 
                        width='24'
                        skeletonHeight='4'>
                            <Heading size="sm" textTransform="uppercase">
                                {data.post.creator.username}
                            </Heading>
                            <Text fontSize='sm'>
                            {formatDistanceToNow(new Date(parseInt(data.post.createdAt)), {
                                addSuffix: true,
                            })}
                            </Text>
                        </SkeletonText>
                    {meData?.me?.id === data.post.creatorId && 
                    (<Box ml='auto' >
                        <Skeleton isLoaded={!loading}>
                            <EditDeleteMenu id={data.post.id} />
                        </Skeleton>
                    </Box>)}
            </Flex>
            <SkeletonText
            isLoaded={!loading}
            noOfLines={4}
            skeletonHeight='4'
            mb={4}>
                <Text my={4}>
                    {data.post.text}
                </Text>
            </SkeletonText>
            <Skeleton isLoaded={!loading}>
                <Image
                    objectFit="cover"
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Chakra UI"
                    mb={2}
                />
            </Skeleton>
            <Skeleton isLoaded={!loading}>
                <Flex alignItems='center' mb={2}>
                    <LikePostButton 
                        isLiked={data.post.isLiked}
                        iconSize={28}
                        id={data.post.id} />
                    <Text fontSize='sm' fontWeight='bold' ml='auto'>
                        {data.post.likeCount} likes 
                        &nbsp; {data.post.commentCount} comments
                    </Text>
                </Flex>
            </Skeleton>
            <Divider mb={4} color='gray'/>
            <CommentSection
                postId={data.post.id} />
        </Layout>
    );
};

export default withApollo({ ssr: false })(Post);
