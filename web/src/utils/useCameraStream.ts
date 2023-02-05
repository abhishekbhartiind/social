import { useEffect, useState } from "react";
import { useCameraContext } from "../context/CameraContext";

type CameraStreamStateType = 'close' | 'loading' | 'open' | 'failure';

export const useCameraStream = () => {

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>();
    const [cameraStreamState, setCameraStreamState] = useState<CameraStreamStateType>(
        'close'
    );

    const { video } = useCameraContext();

    const handleSetActiveDeviceId = (id: string) => {
        setActiveDeviceId(id);
    }

    const closeCameraStream = () => {
        if (!video.current) return;
        video.current.pause();
        const stream = video.current.srcObject;
        if (stream instanceof MediaStream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        video.current.srcObject = null;
    }

    useEffect(() => {
        (async () => {
            setCameraStreamState('loading');

            if (stream) {
                stream.getTracks().forEach(track => {
                  track.stop();
                });
            }
            
            const constraints = { 
                video: { 
                    deviceId: activeDeviceId ? 
                        { exact: activeDeviceId } : undefined,
                    facingMode: 'user',
                    width: { min: 1024, ideal: 1280 },
                    height: { min: 576, ideal: 720 }
                }, 
                audio: false,
            };
    
            try {
                const stream = await navigator.mediaDevices
                    .getUserMedia(constraints);
                const devices = await navigator.mediaDevices
                    .enumerateDevices();

                setDevices(devices.filter(device => device.kind == 'videoinput'));

                setStream(stream);
                if (video.current) {
                    video.current.srcObject = stream;
                    video.current.play();
                    setCameraStreamState('open');
                }
            } catch (error) {
                console.error(`An error occurred; ${error}`)
                setCameraStreamState('failure');
            }
        })();
    }, [activeDeviceId]);

    return {
        devices,
        activeDeviceId,
        cameraStreamState,
        closeCameraStream,
        handleSetActiveDeviceId,
    }
}