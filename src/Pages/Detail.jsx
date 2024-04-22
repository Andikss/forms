import { useState, useEffect } from 'react';
import { Container, Heading, Stack, Text, FormControl, FormLabel, Input, Textarea, Select, Button, Flex, Box, Checkbox, useToast } from '@chakra-ui/react';
import { Topbar } from '../Components/Template/Topbar';
import axios from 'axios';
import { HiSave } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

const Detail = () => {
  const [questions, setQuestions] = useState([{ question: '', choice_type: '', options: [''], is_required: false }]);
  const [form, setForm] = useState({});
  const toast = useToast();
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
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', choice_type: '', options: [''], is_required: false }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions); 
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    const question = newQuestions[index];
  
    console.log('Before adding option:', question); // Log the question before modification
  
    // Check if choices array exists, if not, initialize it
    if (!question.choices) {
      question.choices = [''];
    } else {
      // If choices array already exists, push an empty string to it
      question.choices.push('');
    }
  
    console.log('After adding option:', question); // Log the question after modification
  
    newQuestions[index] = question; // Update the question in the questions array
    setQuestions(newQuestions); // Update the state
  };
  
  

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].is_required = !newQuestions[index].is_required;
    setQuestions(newQuestions);
  };

  const renderAnswerInputs = (questionIndex) => {
    const question = questions[questionIndex];
    
    let optionsArray;
    if (typeof question.choices === 'string') {
      optionsArray = question.choices.split(',');
    } else if (Array.isArray(question.choices)) {
      optionsArray = question.choices;
    } else {
      optionsArray = [];
    }    
  
    switch (question.choice_type) {
      case 'multiple choice':
      case 'dropdown':
      case 'checkboxes':
        return (
          <Stack spacing={4}>
            {optionsArray.map((option, optionIndex) => (
              <Input
                key={optionIndex}
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option} 
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              />
            ))}
            <Button onClick={() => handleAddOption(questionIndex)}>Add Option</Button>
          </Stack>
        );
      default:
        return null;
    }
  };
  
  const handleSaveQuestion = async (formattedQuestion) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem('token');

      const method = formattedQuestion.id ? 'put' : 'post';

      const response = await axios[method](`${baseURL}/forms/${form.slug}/questions`, formattedQuestion, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      console.log(`Question saved successfully!`);

      // Show success toast
      toast({
        title: 'Question Saved',
        description: `Question saved successfully!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving question:', error);

      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while saving the question.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteQuestion = async (index) => {
    try {
      // Delete question from backend
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem('token');
      const questionId = questions[index].id; // Assuming each question has an 'id' field
      await axios.delete(`${baseURL}/forms/${form.slug}/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update state to remove deleted question
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);

      // Show success toast
      toast({
        title: 'Question Deleted',
        description: `Question deleted successfully!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting question:', error);

      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the question.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
          { form.name }
        </Heading>
        <Text fontSize="sm" opacity="70%" mb={3}>
          { form.description }
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
        <form
          key={index}
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveQuestion({
              id: question.id,
              name: question.question,
              choice_type: question.choice_type,
              choices: question.choices || [],
              is_required: question.is_required || false 
            });
          }}
        >
          <Container
            maxW={{ base: '90%', md: '80%', xl: '60%' }}
            height="auto"
            border="1px solid #E2E8F0"
            padding="2rem"
            mt={index === 0 ? "1rem" : "0.5rem"}
            borderRadius="10px"
            background="white"
          >
            <Flex flexDir="row" gap={2} mt={4}>
              <FormControl mb={4} width={{ base: '100%', md: '100%', xl: '70%' }}>
                <FormLabel>Question</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Question"
                  rows={3}
                  cols={30}
                  defaultValue={question.name}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
              </FormControl>

              <FormControl mb={4} width={{ base: '100%', md: '100%', xl: '30%' }}>
                <FormLabel>Type of Question</FormLabel>
                <Select
                  placeholder="Select question type"
                  value={question.choice_type}
                  onChange={(e) => {
                    handleQuestionChange(index, 'choice_type', e.target.value);
                    handleQuestionChange(index, 'options', ['']); 
                  }}
                >
                  <option value="short answer">Short Answer</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="datetime">Datetime</option>
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkboxes">Checkboxes</option>
                </Select>
              </FormControl>
            </Flex>

            {/* Render answer inputs based on selected question type */}
            {renderAnswerInputs(index)}

            {/* Checkbox for is_required */}
            <FormControl display="flex" alignItems="center" mt={4}>
              <Checkbox isChecked={question.is_required} onChange={() => handleCheckboxChange(index)}>
                Required
              </Checkbox>
            </FormControl>

            <Flex justifyContent="end" gap={2} mt={4}>
              <Button 
                colorScheme='red' 
                shadow='sm' 
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete
              </Button>
              <Button 
                colorScheme='teal' 
                shadow='sm' 
                float='inline-end' 
                leftIcon={<HiSave/>} 
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveQuestion({
                    id: question.id,
                    name: question.question,
                    choice_type: question.choice_type,
                    choices: question.choices || [],
                    is_required: question.is_required || false 
                  });
                }}
              >
                Save
              </Button>
            </Flex>
          </Container>
        </form>
      ))}

      <Flex width="100%" justifyContent="center" mt={3}>
        <Box display="flex" justifyContent="end" width={{ base: '90%', md: '80%', xl: '60%' }}>
            <Button colorScheme="teal" onClick={handleAddQuestion}>Add Question</Button>
        </Box>
      </Flex>
    </Stack>
  );
};

export default Detail;