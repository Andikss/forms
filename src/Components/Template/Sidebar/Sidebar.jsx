import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack } from "@chakra-ui/react";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import PropTypes from 'prop-types'; 

export const Sidebar = ({ isActive }) => {
  return (
    <Stack height="calc(100vh - 60px)" width="280px" position="fixed" left={0} top="60px" background="white" py={4}>
      <Link as={RouterLink} to="/" background={isActive === "home" ? "#C3E6FE" : "white"} width="100%" height="40px" shadow={ isActive === "home" ? 'sm' : 'none' } borderRightRadius="15px" display="flex" alignItems="center" px={5} fontWeight="500" fontSize="14px" textDecoration="none">
        <Box as={HiOutlineHome} mr={2} boxSize={6} /> Home
      </Link>
      <Link as={RouterLink} to="/logout" background={isActive === "logout" ? "#C3E6FE" : "white"} width="100%" height="40px" shadow={ isActive === "logout" ? 'sm' : 'none' } borderRightRadius="15px" display="flex" alignItems="center" px={5} fontWeight="500" fontSize="14px" textDecoration="none">
        <Box as={HiOutlineLogout} mr={2} boxSize={6} /> Logout
      </Link>
    </Stack>
  );
};

Sidebar.propTypes = {
    isActive: PropTypes.func.isRequired, 
};