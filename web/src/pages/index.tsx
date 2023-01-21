import { Button, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import { LoadMoreButton } from "../components/buttons/LoadMoreButton";
import Layout from "../components/Layout";
import PostCard from "../components/post/PostCard";
import { useMeQuery, usePostsQuery } from "../gql/graphql";
import withApollo from "../utils/withApollo";

const Index = () => {
    const { data: meData } = useMeQuery();
    const { data, loading, fetchMore } = usePostsQuery({
        variables: {
            options: {
                limit: 10,
                cursor: null,
            }
        },
        notifyOnNetworkStatusChange: true,
    });

    const handleLoadMore = () => {
        if (data) {
            fetchMore({
                variables: {
                    cursor: data.posts.data[data.posts.data.length - 1].createdAt,
                }
            });
        }
    }

    return (
        <Layout home variant="small">
            <Flex alignItems="center">
                <Heading fontSize={[30]}>Instapets</Heading>
                <Button as={NextLink} href="/create-post" ml="auto">
                    <Text>Create</Text>
                </Button>
            </Flex>
            {loading && <div>Loading posts...</div>}
            <br />
            <Stack direction='column' spacing={4} mb={4}>
                {data?.posts.data.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        meId={meData?.me?.id} />
                ))}
            </Stack>
            {data && data.posts.hasMore && (
                <LoadMoreButton
                    loading={loading}
                    onLoadMore={handleLoadMore} />
            )}
        </Layout>
    );
}

export default withApollo({ ssr: true })(Index);
