import { PublicKey } from "@solana/web3.js";
import React from "react";
import TokenIcon from "./TokenIcon";

interface TokenAmountProps {
  amount: number;
  mint?: PublicKey | string;
  explorer?: boolean;
}

export default function TokenAmount({ amount, mint, explorer }: TokenAmountProps) {
  return (
    <div className="flex flex-row align-middle pl-1">
      <span className="font-bold">{amount}</span>
      <TokenIcon mint={mint} explorer={explorer} mini />
    </div>
  );
}
