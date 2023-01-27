import React from "react"
import { CameraContextProvider } from "../context/CameraContext"

export const withCameraContext = (Component: React.FC) => {
    return (props: any) => (
        <CameraContextProvider>
            <Component {...props} />
        </CameraContextProvider>
    )
}