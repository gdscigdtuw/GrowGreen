import React from "react";
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Button, HStack } from "@chakra-ui/react";
import { Flex, Img } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Flex w="100%" h="10vh" bg="black" color="white" p="5">
      <HStack alignContent="center">
        <Button colorScheme="facebook" h="40px" leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="twitter"  h="40px" leftIcon={<FaTwitter />}>
          Twitter
        </Button>
        
        <Button onClick={"www.google.com"} bg="#2C303A" alignItems="inherit" h="40px" _hover= {{
              color : "#013870",
              bg : "white"
            }}>
        <Img h="30px" src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"></Img> Join Server
        </Button>
      </HStack>
    </Flex>
    
  );
};

export default Footer;
