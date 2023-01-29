import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../../components/InputField';
import Layout from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../gql/graphql';
import { useToxicTextDetector } from '../../../utils/useToxicTextDetector';
import withApollo from '../../../utils/withApollo';

type FormFields = {
    text: string;
    title: string;
}

const EditPost: React.FC<{}> = ({}) => {
    const toast = useToast();
    const router = useRouter();
    const postId = typeof router.query.id === 'string' ?
        router.query.id : "";
    const { data, loading, error } = usePostQuery({
        skip: postId === "",
        variables: { 
            postId,
        }
    });

    const methods = useForm<FormFields>({
        values: {
            title: data?.post?.title || "",
            text: data?.post?.text || "",
        }
    });

    const [updatePost] = useUpdatePostMutation();
    const { getWarningForToxicText } = useToxicTextDetector();

    const onSubmit: SubmitHandler<FormFields> = async (
        values
    ) => {
        if (!(values.text && values.title)) return;
        const toxicText = await getWarningForToxicText(values.text);
        const toxicTitle = await getWarningForToxicText(values.title);
        if (toxicText) {
            methods.setError('text', { type: 'custom', message: toxicText });
        }
        if (toxicTitle) {
            methods.setError('title', { type: 'custom', message: toxicTitle });
        }
        const { data: result, errors } = await updatePost({ 
            variables: {
                postId: data?.post?.id || "-1",
                ...values
            }
        });
        if (!errors && result?.updatePost) {
            toast({
                title: `Post edited!`,
                description: `Post titled ${result.updatePost.title} created by 
                    ${result.updatePost.creator.username}.`,
                duration: 3000,
                position: 'top',
                isClosable: true,
                status: 'success'
            });
            router.back();
        }
    }

    if (loading) {
        return <Layout><div>loading...</div></Layout>;
    }

    if (error) {
        return <Layout><div>{error.message}</div></Layout>;
    }

    if (!loading && !data?.post) {
        return <Layout><div>Cannot find post</div></Layout>;
    }

    return (
        <Layout variant='small' home={false}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputField
                        label='Title'
                        name='title'
                        placeholder='Title' />
                    <Box mt={2}>
                        <InputField
                            label='Content'
                            name='text'
                            placeholder='Write a caption...'
                            inputVariant='textarea' />
                    </Box>
                    <Button 
                        mt={4}
                        isLoading={methods.formState.isSubmitting}
                        colorScheme='teal'
                        type='submit'
                    >
                        Done
                    </Button>
                </form>
            </FormProvider>
        </Layout>
    );
}

export default withApollo({ ssr: false })(EditPost);