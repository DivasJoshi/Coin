import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ExchangeCart = ({ image, name, rank, url }) => {
  return (
    <>
      <a href={url} target={"blank"}>
        <VStack
          w={"52"}
          shadow={"xl"}
          p={"8"}
          borderRadius={"lg"}
          transition={"all 0.3s"}
          m={"4"}
          css={{
            "&:hover": {
              transform: "scale(1.5)",
            },
          }}
        >
          <Image
            src={image}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt="exchange"
          />
          <Heading size={"md"} noOfLines={1}>
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>
    </>
  );
};

export default ExchangeCart;
