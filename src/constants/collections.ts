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

export interface Collection {
  id: string;
  name: string;
  info: CollectionInfo;
  profile?: string;
  cover?: string;
  website?: string;
}

export const localCollections: Collection[] = [
  {
    id: "dippies",
    name: "Dippies",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw"),
      },
    },
    website: "https://goatswap.xyz/collection/318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw",
    profile:
      "https://vx72idvq3z6ayz3nriyicqsd62z63zn2r2s6l2tcjdsaxr24ghvq.arweave.net/rf-kDrDefAxnbYowgUJD9rPt5bqOpeXqYkjkC8dcMes",
  },
];

export const testnetCollections: Collection[] = [
  {
    id: "dippies",
    name: "Dippies",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw"),
      },
    },
    website: "https://goatswap.xyz/collection/318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw",
    profile:
      "https://vx72idvq3z6ayz3nriyicqsd62z63zn2r2s6l2tcjdsaxr24ghvq.arweave.net/rf-kDrDefAxnbYowgUJD9rPt5bqOpeXqYkjkC8dcMes",
  },
];

export const mainnetCollections: Collection[] = [
  {
    id: "dippies",
    name: "Dippies",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw"),
      },
    },
    website: "https://goatswap.xyz/collection/318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw",
    profile:
      "https://vx72idvq3z6ayz3nriyicqsd62z63zn2r2s6l2tcjdsaxr24ghvq.arweave.net/rf-kDrDefAxnbYowgUJD9rPt5bqOpeXqYkjkC8dcMes",
  },
];
