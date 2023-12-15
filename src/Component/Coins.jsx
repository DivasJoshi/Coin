import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../App";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Error from "./Error";
import Loader from "./Loader";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrecy] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) {
    return <Error message={"Error while fetching Coins"} />;
  }

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btn = new Array(132).fill(1);

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrecy} p={"6"}>
            <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => {
              return (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  image={i.image}
                  name={i.name}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflow={"auto"} p={"8"}>
            {btn.map((item, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    changePage(index + 1);
                  }}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
