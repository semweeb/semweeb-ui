import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const path = router.pathname

  return (
    <ChakraProvider>
      {path !== "/" && <Navbar />}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
