import { Box, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { MutationCreatePostArgs, useCreatePostMutation } from '../gql/graphql';
import useIsAuth from '../utils/useIsAuth';
import { useToxicTextDetector } from '../utils/useToxicTextDetector';
import withApollo from '../utils/withApollo';

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();

    const methods = useForm<MutationCreatePostArgs>();
    const [createPost] = useCreatePostMutation();

    const { getWarningForToxicText } = useToxicTextDetector();

    const onSubmit: SubmitHandler<MutationCreatePostArgs> = async (
        values
    ) => {
        if (!(values.text && values.title)) return;
        const toxicText = await getWarningForToxicText(values.text);
        const toxicTitle = await getWarningForToxicText(values.title);
        if (toxicText) {
            methods.setError('text', { type: 'custom', message: toxicText });
        }
        if (toxicTitle) {
            methods.setError('title', { type: 'custom', message: toxicTitle});
        }
        if (!(toxicText || toxicTitle)) {
            const { data, errors } = await createPost({ 
                variables: values,
                update: (cache) => {
                    cache.evict({ fieldName: "posts"})
                }
            });
            if (!errors && data) {
                router.push('/');
            }
        }
    }

    return (
        <Layout variant='small' home={false}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Flex direction='column'>
                        <InputField
                            label='Title'
                            name='title'
                            placeholder='Enter title'
                            variant='flushed'
                            inputVariant='editableInput' />
                        <Box mt={2}>
                            <InputField
                                name='text'
                                variant='flushed'
                                placeholder='Write a caption...'
                                inputVariant='textarea' />
                        </Box>
                        <Button 
                            mt={4}
                            isLoading={methods.formState.isSubmitting}
                            colorScheme='teal'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Flex>
                </form>
            </FormProvider>
        </Layout>
    );
}

export default withApollo({ ssr: false })(CreatePost);