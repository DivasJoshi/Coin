import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../App";
import { Container, HStack } from "@chakra-ui/react";
import ExchangeCart from "./ExchangeCart";
import Error from "./Error";
import Loader from "./Loader";

const Exchanges = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchange(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (error) {
    return <Error message={"Error while fetching exchanges"}/>;
  }

  return (
    <Container maxW={"container.lg"}>
      {loading? (
        <><Loader/></>
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {exchange.map((i) => {
              return (
                <ExchangeCart
                  image={i.image}
                  name={i.name}
                  url={i.url}
                  rank={i.trust_score_rank}
                  key={i.id}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;
