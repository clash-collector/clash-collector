import * as anchor from "@project-serum/anchor";

export interface CollectionInfo {
  v1?: {
    verifiedCreators: anchor.web3.PublicKey[];
    symbol: string;
    whitelistRoot: number[];
  };
  v2?: {
    collectionMint: anchor.web3.PublicKey;
  };
}
