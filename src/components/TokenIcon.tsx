import React from "react";
import { PublicKey } from "@solana/web3.js";
import useTokens from "../hooks/useTokens";
import useExplorer from "../hooks/useExplorer";
import { shortAddress } from "../utils";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

interface TokenIconProps {
  mint?: PublicKey | string;
  explorer?: boolean;
  mini?: boolean;
}

const TokenLine = (img: React.ReactNode, name: string, mini?: boolean) => {
  return (
    <div className="flex flex-row align-middle pl-1">
      {img}
      {!mini && <div className="m-auto pl-1">{name}</div>}
    </div>
  );
};

export default function TokenIcon({ mint, explorer, mini }: TokenIconProps) {
  const { map } = useTokens();
  const { name: explorerName, addressLink } = useExplorer();

  const token = map?.get(mint ? (typeof mint === "string" ? mint : mint.toString()) : "");

  const name = token ? token.name : shortAddress(mint);
  const logo = token?.logoURI ? (
    <img className="w-5 h-5 my-auto" src={token.logoURI} />
  ) : (
    <QuestionMarkCircleIcon className="w-5 h-5 my-auto" />
  );

  return explorer && mint ? (
    <a href={addressLink(mint)} className="tooltip" data-tip={`View on ${explorerName}`}>
      {TokenLine(logo, name, mini)}
    </a>
  ) : (
    TokenLine(logo, name, mini)
  );
}
