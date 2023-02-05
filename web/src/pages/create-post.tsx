import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex, Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Image } from '@chakra-ui/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useCameraContext } from '../context/CameraContext';
import { MutationCreatePostArgs, useCreatePostMutation } from '../gql/graphql';
import { updateCurrentUserTotalPostCount } from '../utils/updateCache';
import useIsAuth from '../utils/useIsAuth';
import { useToxicTextDetector } from '../utils/useToxicTextDetector';
import withApollo from '../utils/withApollo';

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    const toast = useToast();
    useIsAuth();

    const methods = useForm<MutationCreatePostArgs>();
    const [createPost] = useCreatePostMutation();

    const { getWarningForToxicText } = useToxicTextDetector();
    const { image } = useCameraContext();

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
                variables: {
                    ...values,
                    images: image ? [image] : [],
                },
                update: (cache) => {
                    updateCurrentUserTotalPostCount(cache, 'UP', 1);
                    cache.evict({ fieldName: "posts"})
                }
            });
            if (!errors && data) {
                toast({
                    title: `New post!`,
                    description: `Post titled ${data.createPost.title} created by 
                        ${data.createPost.creator.username}.`,
                    duration: 3000,
                    position: 'top',
                    isClosable: true,
                    status: 'success'
                });
                router.push('/');
            } else if (errors) {
                toast({
                    title: 'Error when creating post!',
                    description: errors[0].message,
                    duration: 5000,
                    position: 'top',
                    isClosable: true,
                    status: 'error'
                })
            } else {
                toast({
                    title: 'Cannot create post!',
                    duration: 5000,
                    position: 'top',
                    isClosable: true,
                    status: 'error'
                });
            }
        }
    }

    return (
        <Layout home>
            <Heading 
                as={NextLink} 
                href='/'
                fontSize={[30]}>Social</Heading>
            <Divider />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Flex mt={4} direction='column'>
                        <InputField
                            label='Title'
                            name='title'
                            placeholder='Enter title' />
                        <Box mt={2}>
                            <InputField
                                name='text'
                                variant='flushed'
                                placeholder='Write a caption...'
                                inputVariant='textarea' />
                        </Box>
                        <Divider my={2} borderColor='gray.500' />
                        {image && <Image my={2} src={image} alt='captured photo' />}
                        <Button
                        as={NextLink}
                        href='/take-photo'>
                            {image ? 'Retake' : 'Take'} photo
                        </Button>
                        <Button 
                            mt={2}
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