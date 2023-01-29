import { MenuItem, MenuItemProps } from '@chakra-ui/menu';
import { Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useDeletePostMutation } from '../../gql/graphql';
import { updateCurrentUserTotalPostCount } from '../../utils/updateCache';

type DeleteMenuItemProps = MenuItemProps & {
    id: string;
}

export const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({ 
    id, ...rest 
}) => {
    const toast = useToast();
    const router = useRouter();
    const [deletePost] = useDeletePostMutation();
    const { onOpen, onClose, isOpen } = useDisclosure();

    const handleDeletePost = async (id: string) => {
        await deletePost({
            variables: { postId: id },
            update: (cache) => {
                updateCurrentUserTotalPostCount(cache, 'DOWN', 1);
                cache.evict({ id: 'Post:' + id })
            }
        });
        toast({
            title: 'Post deleted!',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
        });
        router.push('/');
    };
    
    return (
        <>
            <MenuItem 
                {...rest}
                icon={<RiDeleteBin5Fill size={18}/>}
                onClick={onOpen}
            >
                Delete post
            </MenuItem>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete this post?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={() => handleDeletePost(id)}>Sure</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};