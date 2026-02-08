"use client";

import { useState } from "react";
import { Input } from "./ui/input";

const Converter = ({ symbol, icon, priceList }: ConverterProps) => {
  const [currency, setCurrency] = useState("usd");
  const [amount, setAmount] = useState("10");

  const convertPrice = (parseFloat(amount) || 0) * (priceList[currency] || 0);
  return (
    <div id="converter">
      <h4>{symbol.toLocaleUpperCase()} Converter</h4>
      <div className="input-wrapper">
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
      </div>
    </div>
  );
};

export default Converter;
