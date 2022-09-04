import { useLocalStorage } from "@solana/wallet-adapter-react";
import { APP_NAME } from "../constants";

export enum Networks {
  Mainnet,
  Testnet,
  Localnet,
}

export default function useNetwork() {
  const [network, setNetwork] = useLocalStorage(`${APP_NAME}_network`, Networks.Mainnet);

  let endpoint: string;
  switch (network) {
    case Networks.Mainnet:
      endpoint = "http://api.mainnet-beta.solana.com";
      break;
    case Networks.Testnet:
      endpoint = "http://api.testnet.solana.com";
      break;
    case Networks.Localnet:
      endpoint = "http://localhost:8899";
      break;
    default:
      endpoint = "http://api.mainnet-beta.solana.com";
      break;
  }

  return { endpoint, network, setNetwork };
}
