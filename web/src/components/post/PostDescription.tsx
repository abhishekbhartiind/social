import { Badge, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface PostDescriptionProps {
    username: string;
    textSnippet: string;
    fullText: string;
}

const PostDescription: React.FC<PostDescriptionProps> = ({
    username,
    textSnippet,
    fullText
}) => {
    const [textVisibility, setTextVisibility] = useState<"snippet" | "full">(
        "snippet"
    );

    return (
        <Box mb={4}>
            <Text>
                <strong>{username}</strong> 
                &nbsp;
                {textVisibility === 'snippet' ? textSnippet : fullText}
                &nbsp;
                <Badge
                    mr={2}
                    cursor="pointer"
                    onClick={() => setTextVisibility(
                        textVisibility ==='snippet' ? 'full' : 'snippet'
                    )}
                >
                    {textVisibility === 'snippet' ? 'more' : 'less'}
                </Badge>
            </Text>
        </Box>
    );
};

export default PostDescription;