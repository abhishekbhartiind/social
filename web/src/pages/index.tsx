import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { PostFeature } from "../components/PostFeature";
import { useMeQuery, usePostsQuery } from "../gql/graphql";
import withApollo from "../utils/withApollo";

const Index = () => {
    const { data: meData } = useMeQuery();
    const { data, loading } = usePostsQuery();

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
            <Stack direction='column' spacing={4}>
                {data?.posts.map(post => (
                    <PostFeature 
                        key={post.id} 
                        post={post} 
                        meId={meData?.me?.id} />
                ))}
            </Stack>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Index);
