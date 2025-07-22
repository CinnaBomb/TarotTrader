import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App.tsx'

const theme = extendTheme({
  fonts: {
    heading: `'Almendra', sans-serif`,
    // body: `'Macondo Swash Caps', sans-serif`,
  },
  colors: {
    purple: {
      50: '#f3e8ff',
      100: '#d6bcfa',
      200: '#b794f4',
      300: '#9f7aea',
      400: '#805ad5',
      500: '#6b21a8',
      600: '#581c87',
      700: '#4c1d95',
      800: '#3c096c',
      900: '#2a0653',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
