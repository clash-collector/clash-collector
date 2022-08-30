import React from "react";
import { PublicKey } from "@solana/web3.js";
import useTokens from "../hooks/useTokens";
import useExplorer from "../hooks/useExplorer";
import { shortAddress } from "../utils";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

interface TokenIconProps {
  mint?: PublicKey | string;
  explorer?: boolean;
}

const TokenLine = (img: React.ReactNode, name: string) => {
  return (
    <div className="flex flex-row align-middle">
      {img}
      <div className="m-auto pl-1">{name}</div>
    </div>
  );
};

export default function TokenIcon({ mint, explorer }: TokenIconProps) {
  const { map } = useTokens();
  const { name: explorerName, addressLink } = useExplorer();

  const token = map?.get(mint ? (typeof mint === "string" ? mint : mint.toString()) : "");

  const name = token ? token.name : shortAddress(mint);
  const logo = token?.logoURI ? (
    <img className="w-8 h-8" src={token.logoURI} />
  ) : (
    <QuestionMarkCircleIcon className="w-8 h-8" />
  );

  return explorer && mint ? (
    <a href={addressLink(mint)} className="tooltip" data-tip={`View on ${explorerName}`}>
      {TokenLine(logo, name)}
    </a>
  ) : (
    TokenLine(logo, name)
  );
}
