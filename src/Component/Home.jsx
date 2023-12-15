import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import img from "../Assets/bitcoin.jpg";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Image
        w={"full"}
        h={"full"}
        objectFit={"contain"}
        src={img}
        filter={"grayscale(1)"}
      />
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        pb={"4"}
      >
        Coin-Info
      </Text>
    </Box>
  );
};

export default Home;
