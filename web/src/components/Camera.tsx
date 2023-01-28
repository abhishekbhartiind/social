import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
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
        streaming,
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
            }
        }
    }, [isCameraActive]);

    return (
        <Flex direction='column'>
            {(cameraStreamState === 'loading') && 
                    <Flex alignItems='center' gap={2}>
                        <Spinner size='xs' color='green.500'/>
                        <Text>Turning on camera...</Text>
                    </Flex>
                }
            {cameraStreamState === 'close' && <Flex
                alignItems='center'
                justifyContent='center' 
                h='300px'
                boxShadow='xl'
                bgColor='green.600'
                cursor='pointer'
                onClick={toggleIsCameraActive}>
                    <FiCamera color='white' size={30}/>
                </Flex>}
            <Box boxShadow='md' display={streaming && cameraStreamState === 'open' &&
                !hasPhoto ? 'flex' : 'none'}>
                <video ref={video}>
                    Video stream not available.
                </video>
            </Box>
            <canvas ref={canvas} style={{ display: 'none' }}></canvas>
            <Box boxShadow='md' display={cameraStreamState === 'open' && hasPhoto ? 'flex' : 'none'}>
                <Image ref={photo} alt='A photo' />
            </Box>
            {streaming && cameraStreamState === 'open' && (
                <Stack mt={2}>
                    {!hasPhoto ? (
                        <Button onClick={(ev) => {
                            takePicture();
                            if (photo.current?.src) {
                                onPhotos([photo.current.src]);
                            }
                            ev.preventDefault();
                        }}>Take photo</Button>
                    ) : (
                        <Button onClick={() => {
                            toggleHasPhoto();
                        }}>Retake photo</Button>
                    )}
                </Stack>
            )}
            {streaming && cameraStreamState === 'open' && (
                <Button mt={2} onClick={toggleIsCameraActive}>
                    Turn off camera
                </Button>
            )}
            <Text mt={2} textAlign='center'>{
                hasPhoto && '1 photo taken'
            }</Text>
        </Flex>
    );
}