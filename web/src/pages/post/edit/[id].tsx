import { Box, Button } from '@chakra-ui/react';
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
        const { errors } = await updatePost({ 
            variables: {
                postId: data?.post?.id || "-1",
                ...values
            }
        });
        if (!errors) {
            router.back();
        }
    }

    if (loading) {
        return <Layout><div>loading...</div></Layout>;
    }

    if (error) {
        return <Layout><div>{error.message}</div></Layout>;
    }

    if (!data?.post) {
        return <Layout><div>Cannot find post</div></Layout>;
    }

    return (
        <Layout variant='small' home={false}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputField
                        label='Title'
                        name='title'
                        placeholder='Title'
                        inputVariant='editableInput' />
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