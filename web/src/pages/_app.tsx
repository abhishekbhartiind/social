import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { CameraContextProvider } from '../context/CameraContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <CameraContextProvider>
                <Component {...pageProps} />
            </CameraContextProvider>
        </ChakraProvider>
    )
}
