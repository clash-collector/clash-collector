import { APP_NAME } from "../constants";
import useLocalStorage from "./useLocalStorage";

type Networks = "Mainnet (beta)" | "Testnet" | "Localnet";
interface Network {
  endpoint: string;
  name: Networks;
  slug: string;
}

const networks: Network[] = [
  { endpoint: "https://try-rpc.mainnet.solana.blockdaemon.tech", name: "Mainnet (beta)", slug: "mainnet-beta" },
  { endpoint: "http://api.testnet.solana.com", name: "Testnet", slug: "testnet" },
  { endpoint: "http://localhost:8899", name: "Localnet", slug: "mainnet-beta" },
];

export default function useNetwork() {
  const [network, setNetwork] = useLocalStorage(`${APP_NAME}_network`, networks[0]);

  const changeNetwork = (networkName: Networks) => {
    setNetwork(networks.find((e) => e.name === networkName) || networks[0]);
  };

  return { ...network, changeNetwork, networks };
}
