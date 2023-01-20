import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { MutationCreatePostArgs, useCreatePostMutation } from '../gql/graphql';
import useIsAuth from '../utils/useIsAuth';
import withApollo from '../utils/withApollo';

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();

    const methods = useForm<MutationCreatePostArgs>();
    const [createPost] = useCreatePostMutation();

    const onSubmit: SubmitHandler<MutationCreatePostArgs> = async (
        values
    ) => {
        const { errors } = await createPost({ 
            variables: values,
            update: (cache) => {
                cache.evict({ fieldName: "posts"})
            }
        });
        if (!errors) {
            router.push('/');
        }
    }

    return (
        <Layout variant='small' home={false}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputField
                        label='Title'
                        name='title'
                        placeholder='Enter title'
                        type='text' />
                    <Box mt={2}>
                        <InputField
                            label='Content'
                            name='text'
                            placeholder='Enter content'
                            textArea />
                    </Box>
                    <Button 
                        mt={4}
                        isLoading={methods.formState.isSubmitting}
                        colorScheme='teal'
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
            </FormProvider>
        </Layout>
    );
}

export default withApollo({ ssr: false })(CreatePost);