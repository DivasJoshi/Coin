import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Coins from "./Component/Coins";
import CoinDetails from "./Component/CoinDetails";
import Exchanges from "./Component/Exchanges";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
        <Route path="/exchanges" element={<Exchanges />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;

export const server = "https://api.coingecko.com/api/v3/";
