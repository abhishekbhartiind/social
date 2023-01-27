export const useCameraStream = () => {
    const openCameraStream = (
        onSuccess: (stream: MediaStream) => void, 
        onFailure: (error: Error) => void
    ) => {
        return navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(onSuccess)
            .catch(onFailure)
    }

    const closeCameraStream = (video: HTMLVideoElement) => {
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
        openCameraStream,
        closeCameraStream,
    }
}