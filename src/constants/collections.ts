import * as anchor from "@project-serum/anchor";
import udderProfile from "../assets/collections/udderChaos/profile.png";
import solPatrolProfile from "../assets/collections/solPatrol/profile.jpg";

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

export const testCollections: Collection[] = [
  {
    id: "sol-patrol",
    name: "Sol Patrol",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("o7njvS3rDVJMa1htv27mGf8ezFUuvAPUe5yaXyZms9d"),
      },
    },
    website: "https://www.solpatrol.io/",
    profile: solPatrolProfile,
  },
];

export const mainnetCollections: Collection[] = [
  {
    id: "udder-chaos",
    name: "Udder Chaos",
    info: {
      v1: {
        verifiedCreators: [
          new anchor.web3.PublicKey("AkUzwmPvYav5Wpi9fC5DUhT3FvY2UpDinNw6ekuAMmSv"),
          new anchor.web3.PublicKey("6M2vcAdNnFcKCnAzACk6SGRKoQ2Ar1Jg511PS6vxJ2P2"),
          new anchor.web3.PublicKey("FQ45nCERysBmtbRDWiBo7uTQksLuUSzi6Dk24gro8RHd"),
          new anchor.web3.PublicKey("8oAHRJZhM9Gwc9vFJqbwxL5dKoYkce4dgtb5yTW4hGyf"),
          new anchor.web3.PublicKey("7ThGUdgFcyorzQv5BpL5vRWYB6k2wN6zv25s6bPyLdsS"),
        ],
        whitelistRoot: [],
        symbol: "UDDER",
      },
    },
    website: "https://www.udderchaos.io/",
    profile: udderProfile,
  },
  {
    id: "sol-patrol",
    name: "Sol Patrol",
    info: {
      v2: {
        collectionMint: new anchor.web3.PublicKey("7Zcfq1fdQYYjKreRoKSf6ungwrFGCgoPcapEeTkj1cQX"),
      },
    },
    website: "https://www.solpatrol.io/",
    profile: solPatrolProfile,
  },
];
