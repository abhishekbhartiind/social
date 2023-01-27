import { Box, Button, Flex, IconButton, Image, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiCamera, FiCameraOff } from 'react-icons/fi';
import { useCameraContext } from '../context/CameraContext';
import { useCameraStream } from '../utils/useCameraStream';

interface CameraProps {
    onPhotos: (photos: string[]) => void;
}

type CameraStreamStateType = 'close' | 'loading' | 'open' | 'failure';

export const Camera: React.FC<CameraProps> = ({ onPhotos }) => {
    const {
        video,
        canvas,
        photo,
        hasPhoto,
        isCameraActive,
        toggleIsCameraActive,
        takePicture,
        toggleHasPhoto,
    } = useCameraContext();

    const { openCameraStream, closeCameraStream } = useCameraStream();

    const [cameraStreamState, setCameraStreamState] = useState<CameraStreamStateType>(
        'close'
    );

    useEffect(() => {
        if (video.current) {
            if (isCameraActive) {
                setCameraStreamState('loading');
                openCameraStream(
                (stream) => {
                    if (video.current) {
                        video.current.srcObject = stream;
                        video.current.play();
                        setCameraStreamState('open');
                    }
                }, 
                (error) => {
                    console.error(`An error occurred; ${error}`)
                    setCameraStreamState('failure');
                });
            } else {
                closeCameraStream(video.current);
                setCameraStreamState('close');
                if (hasPhoto) {
                    toggleHasPhoto();
                }
            }
        }
    }, [isCameraActive]);

    return (
        <Flex direction='column'>
            <Box>
                <IconButton 
                    mb={2}
                    variant='ghost'
                    aria-label='Toggle Camera'
                    bgColor={isCameraActive ? 'teal' : 'transparent'}
                    color={isCameraActive ? 'white' : 'black'}
                    icon={!isCameraActive ? 
                        <FiCameraOff size={20} /> : 
                        <FiCamera size={20} />}
                    onClick={toggleIsCameraActive}
                    />
                {cameraStreamState === 'loading' && 
                    <Flex alignItems='center' gap={2}>
                        <Spinner size='xs' color='green.500'/>
                        <Text>Turning on camera...</Text>
                    </Flex>
                }
                <Stack display={cameraStreamState === 'open' &&
                    !hasPhoto ? 'flex' : 'none'}>
                    <video ref={video}>
                        Video stream not available.
                    </video>
                    <Button onClick={(ev) => {
                        takePicture();
                        if (photo.current?.src) {
                            onPhotos([photo.current.src]);
                        }
                        ev.preventDefault();
                    }}>Take photo</Button>
                </Stack>
            </Box>
            <canvas ref={canvas} style={{ display: 'none' }}></canvas>
            <Stack display={hasPhoto ? 'flex' : 'none'}>
                <Image ref={photo} alt='A photo' />
                <Button onClick={() => {
                    toggleHasPhoto();
                }}>Retake photo</Button>
            </Stack>
        </Flex>
    );
}