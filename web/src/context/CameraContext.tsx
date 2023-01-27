import { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react";

type CameraContextType = {
    video: RefObject<HTMLVideoElement>;
    canvas: RefObject<HTMLCanvasElement>;
    photo: RefObject<HTMLImageElement>;
    streaming: boolean;
    hasPhoto: boolean;
    isCameraActive: boolean;
    toggleIsCameraActive: () => void;
    toggleHasPhoto: () => void;
    toggleStreaming: () => void;
    clearPhoto: () => void;
    takePicture: () => void;
}

const width = 400;
let height = 0;

const CameraContext = createContext<CameraContextType>({} as CameraContextType);

export const CameraContextProvider = (
    { children }:
    { children?: ReactNode }
) => {
    const video = useRef<HTMLVideoElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const photo = useRef<HTMLImageElement>(null);
    const [streaming, setStreaming] = useState(false);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const toggleHasPhoto = () => {
        setHasPhoto(prevState => !prevState);
    }

    const toggleIsCameraActive = () => {
        setIsCameraActive(prevState => !prevState);
    }

    const toggleStreaming = () => {
        setStreaming(prevState => !prevState);
    }

    const clearPhoto = () => {
        if (canvas.current && photo.current) {
            const context = canvas.current.getContext("2d");
            if (context) {
                context.fillStyle = "#AAA";
                context.fillRect(0, 0, canvas.current.width, canvas.current.height);
            }

            const data = canvas.current.toDataURL("image/png");
            photo.current.setAttribute("src", data);
        }
    }

    const takePicture = () => {
        const context = canvas.current?.getContext("2d");
        if (!(context && canvas.current && photo.current && video.current)) return;
        if (width && height) {
            canvas.current.width = width;
            canvas.current.height = height;
            context.drawImage(video.current, 0, 0, width, height);

            const data = canvas.current.toDataURL("image/png");
            photo.current.setAttribute("src", data);
        } else {
            clearPhoto();
        }
        setHasPhoto(true);
    }

    useEffect(() => {
        if (video.current) {
            video.current.addEventListener(
                "canplay", 
            (_) => {
                if (!streaming && video.current && canvas.current) {
                    height = video.current.videoHeight / (
                        video.current.videoWidth / width);
          
                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.
          
                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }
          
                    video.current.setAttribute("width", width.toString());
                    video.current.setAttribute("height", height.toString());
                    canvas.current.setAttribute("width", width.toString());
                    canvas.current.setAttribute("height", height.toString());
                    setStreaming(true);
                }
            }, 
            false);
        }
    })
    return (
        <CameraContext.Provider
        value={{
            video,
            canvas,
            photo,
            streaming,
            hasPhoto,
            isCameraActive,
            toggleIsCameraActive,
            toggleHasPhoto,
            toggleStreaming,
            clearPhoto,
            takePicture
        }}>
            {children}
        </CameraContext.Provider>
    )
}

export const useCameraContext = () => useContext(CameraContext);