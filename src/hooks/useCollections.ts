import { testCollections, mainnetCollections } from "../constants/collections";
import useNetwork, { Networks } from "./useNetwork";

export default function useCollections() {
  const { network } = useNetwork();

  return network === Networks.Mainnet ? mainnetCollections : testCollections;
}
