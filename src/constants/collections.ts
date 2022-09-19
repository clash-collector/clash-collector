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
  buyLink?: string;
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
    buyLink: "https://goatswap.xyz/collection/318p2nhXSiKSPhsQhCtBL1fXNgjUUGPAXG5dbQqSCEpw",
    website: "https://twitter.com/DippiesDust",
    profile:
      "https://vx72idvq3z6ayz3nriyicqsd62z63zn2r2s6l2tcjdsaxr24ghvq.arweave.net/rf-kDrDefAxnbYowgUJD9rPt5bqOpeXqYkjkC8dcMes",
  },
  {
    id: "sentries",
    name: "Sentries",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("5cRT4CbQDaKzPhNuAgxFa43Zzqxv7WGPV2FHWg8VMbUw"),
      },
    },
    buyLink: "https://goatswap.xyz/collection/5cRT4CbQDaKzPhNuAgxFa43Zzqxv7WGPV2FHWg8VMbUw",
    website: "https://www.sentries.io/",
    profile:
      "https://gslr5376rndgxgjgocu4bblovuejjigtii4zq2jmkse7d5czd2ha.arweave.net/NJce7_6LRmuZJnCpwIVurQiUoNNCOZhpLFSJ8fRZHo4",
  },
  {
    id: "sol-patrol",
    name: "Sol Patrol",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("7Zcfq1fdQYYjKreRoKSf6ungwrFGCgoPcapEeTkj1cQX"),
      },
    },
    buyLink: "https://goatswap.xyz/collection/7Zcfq1fdQYYjKreRoKSf6ungwrFGCgoPcapEeTkj1cQX",
    website: "https://solpatrol.io/missions",
    profile:
      "https://s3sj7hotjvtlyiss5yshw77q5pyf7wqsjeon433mzu2jx2qqzzbq.arweave.net/luSfndNNZrwiUu4ke3_w6_Bf2hJJHN5vbM00m-oQzkM",
  },
];
