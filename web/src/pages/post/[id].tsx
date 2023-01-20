import { Box, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import PostButtons from '../../components/buttons/PostButtons';
import Layout from '../../components/Layout';
import { useMeQuery, usePostQuery } from '../../gql/graphql';
import withApollo from '../../utils/withApollo';

const Post: React.FC<{}> = ({}) => {
    const router = useRouter();
    const postId = typeof router.query.id === 'string' ?
        router.query.id : "";
    
    const { data: meData } = useMeQuery();
    const { data, loading, error } = usePostQuery({
        skip: postId === "",
        variables: { 
            postId,
        }
    });

    if (loading) {
        return <Layout>
            <div>loading...</div>
        </Layout>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    if (!data?.post) {
        return <Layout>
            <div>cannot find post</div>
        </Layout>
    }

    return (
        <Layout home={false}>
            <Heading>{data.post.title}</Heading>
            <Text mt={4} mb={12}>{data.post.text}</Text>
            <Box>
                {meData?.me?.id === data.post.creatorId &&
                    <PostButtons 
                        isLiked={!!data.post.isLiked}
                        id={data.post.id} 
                        iconSize={25}/>
                }
            </Box>
        </Layout>
    );
}

export default withApollo({ ssr: false })(Post);