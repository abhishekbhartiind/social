import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Divider, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import Link from 'next/link';
import React from 'react';
import { LoadMoreButton } from '../components/buttons/LoadMoreButton';
import Layout from '../components/Layout';
import { useMeQuery, usePostsByCreatorIdQuery } from '../gql/graphql';
import withApollo from '../utils/withApollo';

interface UserAccountProps {

}

const UserAccount: React.FC<UserAccountProps> = ({}) => {
    const { data: meData, loading, error } = useMeQuery();
    const creatorId = meData?.me ? parseInt(meData.me.id) : -1;
    const { data, loading: loadingPosts, fetchMore } = usePostsByCreatorIdQuery({
        skip: creatorId === -1,
        variables: {
            creatorId: creatorId.toString(),
            options: {
                limit: 9,
            }
        },
        notifyOnNetworkStatusChange: true,
    });

    const handleLoadMore = () => {
        if (data) {
            const length = data.postsByCreatorId.data.length;
            fetchMore({
                variables: {
                    options: {
                        limit: 9,
                        cursor: data.postsByCreatorId.data[length - 1].createdAt,
                    }
                },
            });
        }
    }

    if (loading) {
        return <Layout>
            <Flex alignItems='center' gap={2}>
                <Spinner />
                <Text>  
                    Loading user information...
                </Text>
            </Flex>
        </Layout>
    }

    if (error) {
        return <Layout>
            <Heading fontSize='lg'>{error.message}</Heading>
        </Layout>
    }

    if (!loading && !meData?.me) {
        return <Layout>
            <Heading fontSize='lg'>Cannot find user!</Heading>
        </Layout>
    }

    return (
        <Layout>
            <Stack mb={2}>
                <Flex w='full' alignItems='center' gap={2}>
                    <Avatar size='lg' name={meData?.me?.username} src='' />
                    <Heading fontSize='xl'>{'Ben'}</Heading>
                    <Stack ml='auto' alignItems='center' spacing='0'>
                        <Text>{meData?.me?.totalPostCount}</Text>
                        <Text>Posts</Text>
                    </Stack>
                </Flex>
                <Button as={Link} href='/create-post'>Create post</Button>
                <Divider />
                <Grid
                templateColumns={{ sm: 'repeat(3, 1fr)' }}
                gap={0.5}
                >
                    {data?.postsByCreatorId.data.map(post => (
                    <GridItem 
                        key={post.id} 
                        as={Link} 
                        href={`/post/${post.id}`}>
                        <Image 
                            w='400px'
                            h='300px'
                            objectFit='cover'
                            src={post.imageLinks[0]} 
                            fallbackSrc='https://via.placeholder.com/400' />
                    </GridItem>))}
                </Grid>
                {data?.postsByCreatorId.hasMore ? 
                    <LoadMoreButton 
                    loading={loadingPosts}
                    onLoadMore={handleLoadMore} />  :
                <Text textAlign='center' mb={8}>No posts left</Text>}
            </Stack>
        </Layout>
    );
}

export default withApollo({ ssr: false })(UserAccount);