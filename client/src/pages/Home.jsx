import { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
const Home = () => {
  const [name, setName] = useState("not set");
  useEffect(() => {
    axios
      .get("/api")
      .then((res) => res.data)
      .then((res) => setName(res.name));
  });
  return (
    <div className="app">
      <Flex
        height="100vh"
        width="100%"
        align="center"
        justify="center"
        bg="blue.400"
        color="white"
      >
        <Text fontSize="3xl">{name}</Text>
      </Flex>
    </div>
  );
};

export default Home;
