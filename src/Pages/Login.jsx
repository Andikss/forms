import { useState } from 'react';
import { Box, Flex, useToast, Image } from '@chakra-ui/react';
import { LoginForm } from '@/Components';
import { login } from '@/Services/Auth/Login';
import logo from '@/Assets/img/logo.png';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response?.accessToken);
      localStorage.setItem('user', JSON.stringify(response?.user));
      toast({
        title: 'Login successful',
        status: 'success',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Login failed', error);
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'An error occurred during login',
        status: 'error',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minHeight="100dvh" backdropBlur={10} alignItems="center" justifyContent="center">
      <Box p={8} py={10} width={{ base: '90%', md: '500px' }} borderWidth={1} borderRadius={8} boxShadow="xl">
        <Flex direction="column" alignItems="center">
          <Image src={logo} alt="Logo" boxSize="140px" />
          <Box width="100%" my={4} textAlign="left">
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
