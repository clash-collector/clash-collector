import { useContext } from "react";
import { TokensContext } from "../contexts/Tokens";

export default function useTokens() {
  const { tokenMap: map, tokenNames: names } = useContext(TokensContext);
  return { map, names };
}
