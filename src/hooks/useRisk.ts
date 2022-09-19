import { APP_NAME } from "../constants";
import useLocalStorage from "./useLocalStorage";

export default function useRisk() {
  const [risk, setRisk] = useLocalStorage(`${APP_NAME}_risk`, true);

  return { risk, setRisk };
}
