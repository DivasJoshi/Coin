import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import CoinModeSwitcher from "../ColorModeSwitcher"

const Header = () => {
  return (
    <div>
    <HStack p={"6"} shadow={"base"} bgColor={"blackAlpha.900"}>
      <Button
        variant={"unstyled"}
        mx={"4"}
        color={"white"}
        css={{
          "&:hover": {
            transform: "scale(1.5)",
          },
        }}
      >
        <Link to={"/"}>Home</Link>
      </Button>
      <Button
        variant={"unstyled"}
        color={"white"}
        mx={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.5)",
          },
        }}
      >
        <Link to={"/exchanges"}>Exchanges</Link>
      </Button>
      <Button
        variant={"unstyled"}
        color={"white"}
        mx={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.5)",
          },
        }}
      >
        <Link to={"/coins"}>Coins</Link>
      </Button>
    </HStack>
    <CoinModeSwitcher/>
    </div>
  );
};

export default Header;
