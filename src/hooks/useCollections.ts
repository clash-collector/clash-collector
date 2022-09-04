import { mainnetCollections, testCollections } from "../constants/collections";

import useNetwork from "./useNetwork";

export default function useCollections() {
  const { name } = useNetwork();

  return name === "Mainnet (beta)" ? mainnetCollections : testCollections;
}
