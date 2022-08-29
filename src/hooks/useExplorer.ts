import { PublicKey } from "@solana/web3.js";

/**
 * Get all paths for a specific explorer
 *
 * @returns Explorer properties
 */
export default function useExplorer() {
  // TODO: Use local storage to allow changing explorer
  const name = "SolanaFM";
  const addressLink = (address: PublicKey | string) => {
    return `https://solana.fm/address/${typeof address === "string" ? address : address.toString()}`;
  };

  return { name, addressLink };
}
