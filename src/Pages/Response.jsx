import React, { useState, useEffect } from 'react';
import { Container, Heading, Stack, Text, Button, Flex, Link } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Topbar } from '../Components/Template/Topbar';

const Response = () => {
  const [form, setForm] = useState({});
  const [responses, setResponses] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/forms/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        setForm(response?.data?.form);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/forms/${slug}/responses`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setResponses(response?.data?.responses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [slug]);

  console.log(responses)
  return (
    <Stack pt="60px" minH="100vh" pb={4} background="#F0F5F8">
      <Topbar />
      <Container
        maxW={{ base: '90%', md: '80%', xl: '60%' }}
        height="auto"
        border="1px solid #E2E8F0"
        padding="2rem"
        borderTop="10px solid teal"
        borderRadius="10px"
        background="white"
        marginTop="12px"
      >
        <Heading fontWeight={550} mb={2}>
          {form.name}
        </Heading>
        <Text fontSize="sm" opacity="70%" mb={3}>
          {form.description}
        </Text>

        <Flex justifyContent='end'>
          <Link to='/'>
            <Button colorScheme='teal'>
              Back Home
            </Button>
          </Link>
        </Flex>
      </Container>

      {responses && responses.map((response, index) => (
        <Stack spacing={2} key={index}>
          {response.responses && response.responses.map((resx, idx) => (
            <React.Fragment key={idx}>
              <Container
                maxW={{ base: '90%', md: '80%', xl: '60%' }}
                height="auto"
                border="1px solid #E2E8F0"
                padding="2rem"
                key={index}
                borderRadius="10px"
                background="white"
                marginTop="12px"
              >
                <Text fontWeight='bold' mb={3} fontSize='large'>{resx.user.name}</Text>
                <hr />
                {resx.answers && resx.answers.map((answer, idx) => (
                  <>
                      <Text key={idx} mt={2}>{answer.question.name}</Text>
                      <Text key={idx}><Text fontWeight='bold'>answer : </Text>{answer.value}</Text>               
                      <hr /> 
                  </>
              ))}
              </Container>
            </React.Fragment>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default Response;
