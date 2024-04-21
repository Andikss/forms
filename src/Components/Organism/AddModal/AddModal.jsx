import { useState } from 'react';
import { Button, Checkbox, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Spinner, useToast } from '@chakra-ui/react'; 
import PropTypes from 'prop-types';
import axios from 'axios'; 

export const AddModal = ({ isOpen, onClose }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false); 
  const toast = useToast(); 

  const handleSubmit = async () => {
    try {
      setIsLoading(true); 

      const formData = {
        name: document.getElementById('name').value,
        slug: document.getElementById('slug').value,
        description: document.getElementById('description').value,
        allowed_domains: document.getElementById('allowedDomains').value.split(',').map(domain => domain.trim()), 
        limit_one_response: document.getElementById('limitOneResponse').checked
      };
  
      const token    = localStorage.getItem('token'); 
      const response = await axios.post(`${baseURL}/forms`, formData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      toast({
        title: "Form submitted",
        status: "success",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });

      window.location.href = response?.data?.form?.slug + '/detail';

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error submitting form",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });

      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH="70dvh" overflowY="scroll">
          <FormControl mb={3}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type='text' placeholder='EX: Test Form'/>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="slug">Slug</FormLabel>
            <Input id="slug" type='text' placeholder='EX: test-form'/>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" placeholder="EX: Test form for company's recruitment" rows={4} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="allowedDomains">Allowed Domains</FormLabel>
            <Textarea id="allowedDomains" placeholder="Enter allowed domains separated by commas" rows={4} />
            <FormHelperText>Enter each domain separated by a comma (e.g., domain1.com, domain2.com)</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <Checkbox id="limitOneResponse">Limit One Response</Checkbox>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" color="teal.500" /> : 'Save'} 
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

AddModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
