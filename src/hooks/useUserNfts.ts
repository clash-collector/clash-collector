import { useContext } from "react";
import { UserNftsContext } from "../contexts/UserNfts";

export default function useUserNfts() {
  return useContext(UserNftsContext);
}
