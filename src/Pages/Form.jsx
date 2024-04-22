import { useState, useEffect } from 'react';
import { Container, Heading, Stack, Text, Button, Flex, FormControl, FormLabel, Textarea, Select, Checkbox, Box, Input, RadioGroup, Radio } from '@chakra-ui/react';
import { Topbar } from '../Components/Template/Topbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const baseURL  = import.meta.env.VITE_API_BASE_URL;
        const token    = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/forms/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        setForm(response?.data?.form)
        setQuestions(response?.data?.form?.questions)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [slug]);

  const renderAnswerInput = (question) => {
    let optionsArray;
    if (typeof question.choices === 'string') {
      optionsArray = question.choices.split(',');
    } else if (Array.isArray(question.choices)) {
      optionsArray = question.choices;
    } else {
      optionsArray = [];
    }    

    switch (question.choice_type) {
      case 'short answer':
        return <Input placeholder="Type your answer here" onChange={(e) => setResponses([...responses, [question.id, e.target.value]])} />;
      case 'paragraph':
        return <Textarea placeholder="Type your answer here" onChange={(e) => setResponses([...responses, [question.id, e.target.value]])} />;
      case 'datetime':
        return <Input type="datetime-local" onChange={(e) => setResponses([...responses, [question.id, e.target.value]])} />;
      case 'multiple choice':
        return (
          <RadioGroup onChange={(value) => setResponses([...responses, [question.id, value]])} value={responses[question.id]}>
            <Stack direction="column">
              {optionsArray.map((option, index) => (
                <FormControl key={index} display="flex" alignItems="center">
                  <Radio value={option}>{option}</Radio>
                </FormControl>
              ))}
            </Stack>
          </RadioGroup>
        );
      case 'dropdown':
        return (
          <Select placeholder="Select an option" onChange={(e) => setResponses([...responses, [question.id, e.target.value]])}>
            {optionsArray.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );
      case 'checkboxes':
        return (
          <Stack spacing={2}>
            {optionsArray.map((option, index) => (
              <FormControl key={index} display="flex" alignItems="center">
                <Checkbox id={`option-${index}`} value={option} onChange={(e) => setResponses([...responses, [question.id, e.target.checked]])} />
                <FormLabel htmlFor={`option-${index}`}>{option}</FormLabel>
              </FormControl>
            ))}
          </Stack>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const token   = localStorage.getItem('token');
  
      const formattedResponses = responses.map(([question_id, value]) => ({
        'question_id': question_id,
        'value': value
      }));
  
      const response = await axios.post(`${baseURL}/forms/${form.slug}/responses`, { 'answers': formattedResponses }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      window.location.href = '/'
  
      console.log(response);
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };
  

  return (
    <Stack pt="60px" minH="100dvh" pb={4} background="#F0F5F8">
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
          <Link to={'/'}>
            <Button colorScheme='teal'>
              Back Home
            </Button>
          </Link>
        </Flex>
      </Container>
      {questions.map((question, index) => (
        <Container
          key={index}
          maxW={{ base: '90%', md: '80%', xl: '60%' }}
          height="auto"
          border="1px solid #E2E8F0"
          padding="2rem"
          mt={index === 0 ? "1rem" : "0.5rem"}
          borderRadius="10px"
          background="white"
        >
          <Flex flexDir="column" gap={2} mt={4}>
            <Box mb={2}>
              <Text>
                  {question.name}{question.name.endsWith('?') ? '' : '?'}
              </Text>
            </Box>
            
            {renderAnswerInput(question)}
          </Flex>
        </Container>
      ))}

      <Flex width="100%" justifyContent="center" mt={3}>
        <Box display="flex" justifyContent="end" width={{ base: '90%', md: '80%', xl: '60%' }}>
          <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Flex>
    </Stack>
  );
};

export default Form;
