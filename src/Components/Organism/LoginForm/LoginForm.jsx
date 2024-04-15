import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const LoginForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setIsEmailInvalid(true);
      return;
    }
    if (!password) {
      setIsPasswordInvalid(true);
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={isEmailInvalid}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailInvalid(false);
          }}
        />
        <FormErrorMessage>Email is required</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={isPasswordInvalid}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordInvalid(false);
            }}
          />
          <InputRightElement>
            <IconButton
              bg="transparent"
              variant="ghost"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={togglePassword}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>Password is required</FormErrorMessage>
      </FormControl>
      {isLoading ? (
        <Button width="full" mt={4} colorScheme="teal" disabled>
          <Spinner size="sm" color="teal.500" /> &nbsp; Signing In...
        </Button>
      ) : (
        <Button width="full" mt={4} colorScheme="teal" type="submit">
          Sign In
        </Button>
      )}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
  isLoading: PropTypes.bool.isRequired,
};