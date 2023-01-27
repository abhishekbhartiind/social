import { Avatar, Box, Button, Flex, Heading, IconButton, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useCommentContext } from "../../context/CommentContext";
import { BaseComment, Reply } from "../../gql/graphql";
import { LikeCommentButton } from "../buttons/LikeCommentButton";
import { CommentContent } from "./CommentContent";
import { Replies } from "./Replies";

interface CommentProps {
    comment: BaseComment | Reply;
    loading: boolean;
    parentId?: string;
}

export const Comment: React.FC<CommentProps> = ({ 
    comment, loading, parentId
}) => {
    const { 
        meData,
        isBaseComment,
        onEditComment,
        onDeleteComment,
        onSetParentComment,
    } = useCommentContext();
    const [isEditing, setIsEditing] = useState(false);

    const commentType = isBaseComment(comment) ? "BaseComment" : "Reply";

    const editable = meData?.me && meData.me.id === comment.authorId;

    const handleEditComment = (content: string, isChanged: boolean) => {
        setIsEditing(false);
        if (isChanged) {
            onEditComment(comment.postId, comment.id, content, commentType);
        }
    }

    const handleDeleteComment = () => {
        onDeleteComment(comment.postId, comment.id, commentType, parentId);
    }

    const handleReplyButtonClick = () => {
        onSetParentComment({ 
            author: comment.author.username, 
            id: parentId ? parentId: comment.id
        });
    }

    return (
        <Flex direction='column' alignItems='start'>
            <Flex alignItems='start' gap={2}>
                <SkeletonCircle isLoaded={!loading}>
                    <Avatar size='sm' name={comment.author.username} src="" />
                </SkeletonCircle>
                <Box>
                    <Skeleton isLoaded={!loading}>
                        <Flex alignItems='center' gap={2}>
                            <Heading size='sm'>{comment.author.username}</Heading>
                            <Text fontSize='xs' pt={0.5}>
                                {formatDistanceToNow(
                                    new Date(parseInt(comment.createdAt)), {
                                        addSuffix: true
                                    })}
                            </Text>
                        </Flex>
                    </Skeleton>
                    <Skeleton 
                    isLoaded={!loading}
                    my={1}>
                        <Flex alignItems='center' gap={1}>
                            <CommentContent
                                defaultValue={comment.content}
                                iconSize={15} 
                                isEditing={isEditing}
                                onEdit={handleEditComment}/>
                            {editable && (
                                <Flex ml='auto' gap={1}>
                                    {!isEditing && (<IconButton 
                                        aria-label="Start editing comment"
                                        size="xs" 
                                        icon={<AiOutlineEdit size={15}/>} 
                                        onClick={() => setIsEditing(true)}/>)}
                                    <IconButton 
                                        aria-label="Delete comment"
                                        size="xs" 
                                        icon={<AiOutlineDelete size={15} />}
                                        onClick={handleDeleteComment} />
                                </Flex>
                            )}
                        </Flex>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                        <Flex 
                        alignItems="center" 
                        gap={2} 
                        fontSize='sm'
                        color='gray.500'>
                            <LikeCommentButton 
                                type={isBaseComment(comment) ? "BaseComment" : "Reply"}
                                isLiked={comment.isLiked}
                                iconSize={20}
                                id={comment.id} />
                            <Text>
                                {comment.likeCount} {comment.likeCount <= 1 ? 'like' : 'likes'}
                            </Text>
                            <Button
                            variant='unstyled'
                            fontSize='sm'
                            fontWeight='normal'
                            height='fit-content'
                            onClick={handleReplyButtonClick}>
                                Reply
                            </Button>
                        </Flex>
                    </Skeleton>
                </Box>
            </Flex>
            {isBaseComment(comment) && comment.repliesCount > 0 &&  (
                <Replies 
                    parentId={comment.id}
                    parentRepliesCount={comment.repliesCount}
                    />
            )}
        </Flex>
    );
};
