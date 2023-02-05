import { useState } from "react";

export const useCameraStream = () => {
    const [cameraMode, setCameraMode] = useState<'user' | 'environment'>(
        'user'
    );

    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>();

    const handleToggleCameraMode = () => {
        setCameraMode(prevState => prevState === 'user' ? 
            'environment' : 'user');
    }

    const handleSetActiveDeviceId = (id: string) => {
        setActiveDeviceId(id);
    }

    const openCameraStream = (
        onSuccess: (stream: MediaStream) => void, 
        onFailure: (error: Error) => void
    ) => {
        const constraints = { 
            video: { 
                deviceId: activeDeviceId ? { exact: activeDeviceId } : undefined,
                facingMode: cameraMode,
                width: { min: 1024, ideal: 1280 },
                height: { min: 576, ideal: 720 }
            }, 
            audio: false,
        };

        const handleSuccess = (stream: MediaStream) => {
            navigator.mediaDevices
                .enumerateDevices()
                .then(devices => 
                    setDevices(devices.filter(device => 
                    device.kind == 'videoinput')));
            onSuccess(stream);
        }

        return navigator.mediaDevices.getUserMedia(constraints)
        .then(handleSuccess)
        .catch(onFailure);
    }

    const closeCameraStream = (video?: HTMLVideoElement | null) => {
        if (!video) return;
        video.pause();
        const stream = video.srcObject;
        if (stream instanceof MediaStream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        video.srcObject = null;
    }

    return {
        devices,
        openCameraStream,
        closeCameraStream,
        handleToggleCameraMode,
        handleSetActiveDeviceId,
    }
}