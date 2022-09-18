import { localCollections, mainnetCollections, testnetCollections } from "../constants/collections";

import useNetwork from "./useNetwork";

export default function useCollections() {
  const { name } = useNetwork();

  return name === "Mainnet (beta)" ? mainnetCollections : name === "Testnet" ? testnetCollections : localCollections;
}
