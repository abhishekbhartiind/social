import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { PostFeature } from "../components/PostFeature";
import { useMeQuery, usePostsQuery } from "../gql/graphql";
import withApollo from "../utils/withApollo";

const Index = () => {
    const { data: meData } = useMeQuery();
    const { data, loading, fetchMore } = usePostsQuery({
        variables: {
            limit: 10,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    const handleLoadMore = () => {
        if (data) {
            fetchMore({
                variables: {
                    cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                }
            });
        }
    }
    return (
        <Layout home>
            <Flex alignItems="center">
                <Heading>Instapets</Heading>
                <Button as={NextLink} href="/create-post" ml="auto">
                    Create Post
                </Button>
            </Flex>
            {loading && <div>Loading posts...</div>}
            <br />
            <Stack direction='column' spacing={4} mb={4}>
                {data?.posts.posts.map(post => (
                    <PostFeature 
                        key={post.id} 
                        post={post} 
                        meId={meData?.me?.id} />
                ))}
            </Stack>
            {data && data.posts.hasMore && (
                <Flex>
                    <Button 
                        isLoading={loading} 
                        m="auto" 
                        my={8} 
                        onClick={handleLoadMore}>
                            load more
                    </Button>
                </Flex>
            )}
        </Layout>
    );
}

export default withApollo({ ssr: true })(Index);
