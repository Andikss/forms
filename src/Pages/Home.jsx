import { Box, Button, Flex, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Topbar, Sidebar, LatestForm } from "../Components";
import { HiDocumentAdd } from "react-icons/hi";
import illustration from '@/Assets/icon/forms-illustration.svg';
import { AddModal } from "../Components";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack minH="100dvh" width="100%" pl="280" pt="60px" m={0}>
      <Topbar />
      <Sidebar isActive="home" />
      
      <Stack minH="calc(100vh - 60px)" width='100%' p={4}>
        <Text fontSize="x-large" fontWeight="550" textAlign="center">
          Manage Forms
        </Text>

        <Text textAlign="center" opacity="70%" fontWeight="500" mb={5}>
          Easily manage your forms online with Formify
        </Text>

        <Flex flexDir={{ xl: 'row', md: 'column' }} gap={3}>
          <Box width={{ xl: '50%', md: '100%' }}>
            <Text fontSize="x-large" fontWeight="500" opacity="70%" mb={3}>
              Create a new forms with ease
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cum hic, corporis modi natus provident fuga sint officia quia officiis voluptate nemo unde amet esse laudantium, maiores doloremque quaerat pariatur?
            </Text>

            <Button mt={3} colorScheme="teal" leftIcon={<HiDocumentAdd />} onClick={onOpen}>
              Create new form
            </Button>
            <AddModal isOpen={isOpen} onClose={onClose}/>
          </Box>
          <Box width={{ xl: '50%', md: '100%' }} display="flex" alignItems="center">
            <Image src={illustration} alt="Illustration" boxSize="200px"/>
          </Box>
        </Flex>

        <hr />

        <Text fontSize="large" fontWeight="500" opacity="70%" mb={3}>
          Latest forms
        </Text>

        <LatestForm/>
      </Stack>
    </Stack>
  );
};

export default Home;