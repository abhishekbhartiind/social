import { Button, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, Heading, Text, Stack } from '@chakra-ui/layout';
import { RadioGroup, Radio } from '@chakra-ui/radio';
import { Spinner } from '@chakra-ui/spinner';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useCameraContext } from '../context/CameraContext';
import { useCameraStream } from '../utils/useCameraStream';
import withApollo from '../utils/withApollo';

interface CameraProps {

}

const Camera: React.FC<CameraProps> = ({}) => {
    const router = useRouter();
    const {
        video,
        canvas,
        photo,
        image,
        takePicture,
    } = useCameraContext();

    const { 
        devices,
        activeDeviceId,
        cameraStreamState,
        handleSetActiveDeviceId,
        closeCameraStream,
    } = useCameraStream();

    const [showImage, setShowImage] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(
        activeDeviceId || devices[0]?.deviceId || ''
    );
    
    useEffect(() => {
        if (activeDeviceId) {
            setSelectedCamera(activeDeviceId);
        } else if (devices[0]?.deviceId) {
            setSelectedCamera(devices[0]?.deviceId);
        }
    }, [activeDeviceId, devices]);

    return (
        <Layout home>
            <Flex direction='column' gap={2} minHeight='100vh'>
                <Heading 
                    as={NextLink} 
                    href='/'
                    onClick={() => closeCameraStream()}
                    fontSize={[30]}>Social</Heading>
                <Divider />
                <Flex
                direction='column'
                position='relative'
                w='full'>
                    {(cameraStreamState === 'loading') && 
                    <Flex alignItems='center' gap={2}>
                        <Spinner size='xs' color='green.500'/>
                        <Text>Turning on camera...</Text>
                    </Flex>}
                    <Flex alignItems='center' justifyContent='center' pos='relative'>
                        <Box
                        display={cameraStreamState === 'open' && 
                        !showImage ? 'block' : 'none'}>
                            <video 
                            ref={video} 
                            autoPlay 
                            muted
                            playsInline
                            >
                                Video stream not available.
                            </video>
                        </Box>
                        {cameraStreamState === 'open' && image && showImage && (
                        <Image
                        src={image}
                        alt='captured photo'
                        cursor='pointer'
                        mb={2}
                        onClick={() => setShowImage(!showImage)}
                        />
                    )}
                    </Flex>
                    <canvas ref={canvas} style={{ display: 'none' }} />
                    <Image ref={photo} style={{display: 'none'}} alt='A photo' />
                    {cameraStreamState === 'open' && !showImage &&  (
                        <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        direction={['column', 'row']}
                        py={2}
                        bgColor='whiteAlpha.500'>
                            {devices.length > 0 && <RadioGroup
                            onChange={(camera) => {
                                handleSetActiveDeviceId(camera);
                                setSelectedCamera(camera);
                            }}
                            value={selectedCamera}
                            >
                                <Stack direction='row'>
                                {devices.map(d => (
                                    <Radio 
                                    key={d.deviceId} 
                                    value={d.deviceId}>
                                    {d.label}
                                    </Radio>
                                ))}
                                </Stack>
                            </RadioGroup>}
                            <Flex 
                            py={2}
                            alignItems='center' 
                            justifyContent='center'>
                            {image && (
                                <Box
                                mr={4}
                                width='50px'
                                height={[8, 10]}
                                backgroundPosition='center'
                                backgroundRepeat='no-repeat'
                                backgroundSize='contain'
                                backgroundImage={image}
                                cursor='pointer'
                                onClick={() => setShowImage(!showImage)}
                                />
                            )}
                            <IconButton
                                aria-label='Take photo'
                                variant='ghost'
                                icon={<FiCamera size={25} />}
                                onClick={() => {
                                    takePicture();
                                }} />
                            </Flex>
                        </Flex>
                    )}
                    {cameraStreamState === 'open' && <Button
                        onClick={() => {
                            closeCameraStream();
                            router.push('/create-post');
                        }}>
                            Done
                        </Button>}
                </Flex>
            </Flex>
        </Layout>
    );
}

export default withApollo({ ssr: false })(Camera);