import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";
const Home = () => {
  const [name, setName] = useState("Be a Dendrophile");
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
        color="white"
      >
        <Box>
        backgroundImage="url('..../images/bgimg')
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        </Box>
        <Text fontSize="3xl">{name}</Text>
      </Flex>
    </div>
  );
};

export default Home;
