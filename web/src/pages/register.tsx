import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { MeDocument, MeQuery, useRegisterMutation, UsernamePasswordInput } from '../gql/graphql'
import withApollo from '../utils/withApollo';

type fieldTypes = keyof UsernamePasswordInput;

const Register: React.FC<{}> = ({}) => {
    const toast = useToast();
    const router = useRouter();
    const [register] = useRegisterMutation();

    const methods = useForm<UsernamePasswordInput>()

    const onSubmit: SubmitHandler<UsernamePasswordInput> = async (values) => {
        const response = await register({
            variables: { options: values },
            update: (cache, { data: registerData }) => {
                cache.updateQuery<MeQuery>(
                    { query: MeDocument }, 
                    (_) => {
                        return {
                            __typename: "Query",
                            me: registerData?.register.user,
                        }
                    }
                );
            }
        });
        const registerResponse = response.data?.register;
        if (registerResponse?.errors) {
            registerResponse.errors.forEach((error) => {
                const { field, message } = error;
                methods.setError(
                    field as fieldTypes,
                    { type: "custom", message },
                    { shouldFocus: true }
                );
            });
        } else if (registerResponse?.user) {
            toast({
                title: `Hi, ${registerResponse.user.username}!`,
                position: 'top',
                duration: 5000,
                status: 'success',
                isClosable: true,
            })
            router.push("/"); //client-side navigation to home page
        }
    };

    return (
        <Wrapper variant='small'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                <InputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                />
                <Box mt={4}>
                    <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    />
                </Box>
                <Box mt={4}>
                    <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    />
                </Box>
                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={methods.formState.isSubmitting}
                    type="submit"
                >
                    Submit
                </Button>
                </form>
            </FormProvider>
        </Wrapper>
    );
}

export default withApollo({ ssr: false })(Register);