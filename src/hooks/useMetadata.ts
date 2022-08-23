import { Metaplex, Nft } from "@metaplex-foundation/js";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function useMetadata(mint?: PublicKey) {
  const { connection } = useConnection();
  const metaplex = new Metaplex(connection);
  const [metadata, setMetadata] = useState<Nft>();

  const fetch = async () => {
    if (!connection || !mint) return;
    setMetadata(await metaplex.nfts().findByMint(mint).run());
  };

  useEffect(() => {
    fetch();
  }, [connection, mint]);

  return metadata;
}
