import { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react"
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
        bg = "#426752"
        color="#80D934"
      >
        <Text fontSize="3xl">{name}</Text>
      </Flex>
      <Box
          bgImage="url(https://github.com/dscigdtuw/GrowGreen/blob/main/images/bgimg.jpg?raw=true)"
          bgPosition="center"
          bgRepeat="no-repeat"
          w="80px"
        />
    </div>
  );
};

export default Home;
