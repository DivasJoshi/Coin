import React, { useEffect, useState } from "react";
import CustomBar from "./CustomBar";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stat,
  StatNumber,
  StatLabel,
  Text,
  VStack,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
} from "@chakra-ui/react";
import { server } from "../App";
import Loader from "./Loader";
import axios from "axios";
import Error from "./Error";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrecy] = useState("inr");
  const [days, setDays] = useState("24hr");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();
  const detail = params.id;

  const btn = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  const switchStates = (value) => {
    switch (value) {
      case "24":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${detail}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${detail}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        setLoading(false);
        setCoins(data);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoinDetail();
  }, [detail, currency, days]);

  if (error) {
    return <Error message={"Error while fetching Coin Detail"} />;
  }

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box w={"full"}>
              <Chart currency={currencySymbol} days={days} arr={chartArray} />
            </Box>
            <HStack p={"4"} overflowX={'auto'}>
              {btn.map((i) => {
                return (
                  <Button key={i} onClick={() => switchStates(i)}>
                    {i}
                  </Button>
                );
              })}
            </HStack>
            <RadioGroup value={currency} onChange={setCurrecy} p={"6"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>
            <VStack spacing={"4"} padding={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={"0.4"}>
                last updated on{" "}
                {Date(coins.market_data.last_updated).split(0)[0]}
              </Text>
              <Image
                src={coins.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coins.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coins.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coins.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coins.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >
                #{coins.market_cap_rank}
              </Badge>

              <CustomBar
                high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
              ></CustomBar>
              <Box w={"full"} p="4">
                <Item
                  title={"Max Supply"}
                  value={coins.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coins.market_data.circulating_supply}
                />
                <Item
                  title={"Market Capital"}
                  value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All time low"}
                  value={`${currencySymbol}${coins.market_data.atl[currency]}`}
                />
                <Item
                  title={"All time high"}
                  value={`${currencySymbol}${coins.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

export default CoinDetails;

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};
