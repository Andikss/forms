import { Flex, Avatar, Menu, MenuButton, MenuList, MenuItem, Text, Stack, Image, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import logo from '@/Assets/img/logo.png';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';

export const Topbar = () => {
  const [username, setUsername] = useState("");
  const [hasShadow, setHasShadow] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUsername(userData.name);
    } else {
      window.location.href = '/login'
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${baseURL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      window.location.href = '/login'
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      padding="1rem"
      width="100dvw"
      px={8}
      height="60px"
      position="fixed"
      top={0}
      left={0}
      boxShadow={hasShadow ? "md" : "none"} 
      transition="box-shadow 0.2s"
      background="white"
      zIndex="999"
    >
      <Stack flexDir="row" alignItems="center">
        <Image src={logo} alt="Logo" boxSize="40px" />
        <Text fontSize="larger" fontWeight="bold">LKS Forms</Text>
      </Stack>
      <Stack flexDir="row" alignItems="center">
        <InputGroup width="400px" ml="42px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search..." />
        </InputGroup>
        <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
          <Text marginRight="4px" fontWeight="bold">
            {username}
          </Text>
          <MenuButton>
            <Avatar name={username} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
};
