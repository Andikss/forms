import { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { HiOutlineDocument, HiOutlinePaperAirplane } from 'react-icons/hi';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const LatestForm = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const baseURL  = import.meta.env.VITE_API_BASE_URL;
        const token    = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/forms`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setForms(response.data.form);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchForms();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton height="120px" mb="3"/>
          <Skeleton height="120px" mb="3"/>
          <Skeleton height="120px" mb="3"/>
        </>
      ) : (
        forms.map(form => (
          <Card key={form.id} shadow="none" border="1px solid #E2E8F0">
            <CardBody>
              <Flex w="100%" justifyContent="space-between">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {form.name}
                  </Heading>
                  <Text pt='1' mb={2} fontSize='sm'>
                    {form.description}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <Link to={form.slug + '/detail'}>
                    <Button colorScheme="teal" shadow='sm' leftIcon={<HiOutlineDocument />}> 
                      Open
                    </Button>
                  </Link>
                  <Link to={form.slug + '/responses'}>
                    <Button colorScheme="blue" shadow='sm' leftIcon={<HiOutlinePaperAirplane />}> 
                      Responses
                    </Button>
                  </Link>
                </Flex>
              </Flex>
              <hr />
              <Text pt='1' fontSize='sm'>
                Created at: {formatDate(form.created_at)}
              </Text>
            </CardBody>
          </Card>
        ))
      )}
    </>
  );
};
