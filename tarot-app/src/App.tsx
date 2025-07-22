import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import supabase from './supabase/client'
import './App.css'

const MotionHeading = motion(Heading)
const MotionBox = motion(Box)

function App() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [swapped, setSwapped] = useState(false) // trigger for trading animation
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signup' && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match!',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    }
    setIsLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setIsLoading(false)
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Success',
          description: 'Logged in successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } else {
      // Sign up mode
      const { error } = await supabase.auth.signUp({ email, password })
      setIsLoading(false)
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Success',
          description: 'Account created! Please check your email to confirm your account.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <Box
      minH="100vh"
      bgImage="url('/images/login_background.png')"
      bgSize="500px"
      bgRepeat="repeat"
      bgPosition="center"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, purple.900, purple.300)"
        opacity={0.85}
      />
      <Container maxW="md" py={12} position="relative">
        {/* Increased boxShadow for a more dramatic effect */}
        <Box bg="white" p={8} borderRadius="xl" boxShadow="0 10px 20px rgba(0,0,0,0.3)" overflow="visible">
          <Stack spacing={8}>
            <Stack align="center">
              {/* <MotionHeading
                fontSize="5xl"
                bgGradient="linear(to-t, purple.500, purple.900)"
                bgClip="text"
                mb={2}
                // Animate the heading when "swapped" is true
                initial="initial"
                animate={swapped ? "traded" : "initial"}
              > */}
                <MotionBox
                  as="span"
                  display="inline-block"
                  initial={{ x: 0 }}
                  animate={{ x: swapped ? 20 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Tarot
                </MotionBox>{' '}
                <MotionBox
                  as="span"
                  display="inline-block"
                  initial={{ x: 0 }}
                  animate={{ x: swapped ? -20 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Trader
                </MotionBox>
              {/* </MotionHeading> */}
              <Text fontSize="lg" color="gray.600">
                {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
              </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired mb={4}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    size="lg"
                    borderRadius="md"
                    focusBorderColor="purple.400"
                    _hover={{ borderColor: 'purple.300' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    focusBorderColor="purple.400"
                  />
                </FormControl>

                {mode === 'signup' && (
                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      focusBorderColor="purple.400"
                    />
                  </FormControl>
                )}

                <Button
                  w="full"
                  size="lg"
                  bgGradient="linear(to-r, purple.500, purple.700)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, purple.600, purple.800)",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                  isLoading={isLoading}
                  loadingText={mode === 'login' ? "Signing in..." : "Signing up..."}
                  type="submit"
                >
                  {mode === 'login' ? 'Sign in' : 'Sign up'}
                </Button>
              </Stack>
            </form>

            <Text textAlign="center" mt={4}>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <Link
                color="purple.600"
                fontWeight="bold"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </Text>

            {/* Button to trigger the trading animation */}
            <Button
              mt={4}
              onClick={() => {
                setSwapped(!swapped)
                console.log("swapped:", !swapped)
              }}
              colorScheme="purple"
            >
              Trade!
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default App
