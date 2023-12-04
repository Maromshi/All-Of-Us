import React from "react";
import {
  Box,
  Container,
  TabPanel,
  TabPanels,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Tabs, Tab, TabList } from "@chakra-ui/react";
import { Login } from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
// Container - help to keep our App responsive

const HompePage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        bg={"white"}
        borderRadius={"lg"}
        justifyContent={"center"}
        p={3}
        w={"90%"}
        m={"40px 0 15px 0 "}
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily="work sans" color={"black"}>
          All-Of-Us
        </Text>
      </Box>
      <Box
        bg={"white"}
        borderRadius={"lg"}
        justifyContent={"center"}
        p={4}
        w={"90%"}
        borderWidth="1px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HompePage;
