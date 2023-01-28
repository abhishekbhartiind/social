import { useApolloClient } from '@apollo/client';
import { Box, Flex, Heading, Link } from '@chakra-ui/layout';
import { Button } from "@chakra-ui/button"
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../gql/graphql';
import isServer from '../utils/isServer';

interface NavbarProps {
    home?: boolean;
}

// when Index is server-side rendered, Navbar makes a Me query 
// on the next.js server but the next.js server doesn't have the cookie
// so return { me: null }
export const Navbar: React.FC<NavbarProps> = ({home=false}) => {
    const apolloClient = useApolloClient();
    const { data, loading } = useMeQuery({ 
        skip: isServer(), //don't query on server -> make query client-side on browser
    });
    const [logout, { loading: logoutFetching }] = useLogoutMutation();

    //use useState for re-hydration issue since we make query request on client-side
    const [body, setBody] = useState<any>(null);

    useEffect(() => {
        if (loading) {
            setBody(null);
        } else if (!data?.me) {
            setBody(<>
                <Link as={NextLink} href='/login' mr={4}>login</Link>
                <Link as={NextLink} href='/register'>register</Link>
            </>);
        } else {
            setBody(
                <Flex>
                    <Box mr={4}>{data.me.username}</Box>
                    <Button 
                        variant='link'
                        isLoading={logoutFetching}
                        onClick={async () => {
                            await logout({});
                            await apolloClient.resetStore();
                        }}>logout</Button>
                </Flex>
            );
        }
    }, [loading, data]);

    return (
        <Flex 
        position='sticky' 
        top={0}
        zIndex={1} 
        bg='tan' 
        alignItems='center' 
        p={4}>
            {!home && <Box>
                <Link as={NextLink} href='/'>
                    <Heading>Instapets</Heading>
                </Link>
            </Box>}
            <Box ml='auto'>
                {body}
            </Box>
        </Flex>
    );
}