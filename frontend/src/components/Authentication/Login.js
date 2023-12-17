import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    // If not all the fields are filled
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    // Trying to send all data to our DB with Axios
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Checking by with 'AuthUser' matched password
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // Add the data (user) to our local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      history.push("/chats"); // move to Chats page
      window.location.reload(); // refreshing the page
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing={"5px"}>
      {/* to conatian all of our forms */}
      <FormControl id="login" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel isRequired>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={picLoading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={picLoading}
      >
        Get Guest User
      </Button>
    </VStack>
  );
};
