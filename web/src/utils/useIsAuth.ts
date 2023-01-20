import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../gql/graphql';

export default function useIsAuth() {
    const { data, loading } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !data?.me) {
            router.replace('/login?next=' + router.pathname); //add current pathname to query so that login page can redirect user back to that page
        }
    }, [data, loading, router]);

    return {
        data,
        loading
    };
}
