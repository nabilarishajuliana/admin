import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/user/v1/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data.token);

      toast({
        title: "Success login.",
        status: "success",
        position: "top",
        variant: "top-accent",
        duration: 1500,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login credentials invalid.",
        status: "error",
        position: "top",
        variant: "top-accent",
        duration: 1500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box
        borderWidth={1}
        px={6}
        py={8}
        rounded="md"
        bg="white"
        maxW="lg"
        w={400}
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
          <Text m={3}>
            Admin API berita <code>https://api-tefa-berita.vercel.app</code>
          </Text>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box my={4} textAlign="left">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter username"
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <Button
              colorScheme="blue"
              width="full"
              mt={4}
              type={"submit"}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Box>
        </form>
        <Box textAlign="center">
          <Link color="blue.500" href="#">
            for: my manager hehe | i hope you like it
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
