import * as anchor from "@project-serum/anchor";

import { BattlegroundAccount, ParticipantAccount } from "./hooks/useBattleground";

import { CollectionInfo } from "./constants/collections";
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { Metadata } from "@metaplex-foundation/js";

export function shortAddress(address?: anchor.web3.PublicKey | string) {
  let result: string;
  if (!address) {
    result = "??";
  } else if (typeof address !== "string") {
    result = address.toString();
  } else {
    result = address;
  }
  return result.slice(0, 4) + "..." + result.slice(result.length - 4, result.length);
}

export function formatBN(n: anchor.BN, decimals: number) {
  let array = n.toString().split("");
  array = Array(Math.max(0, decimals - array.length + 1))
    .fill("0")
    .concat(array);
  array.splice(array.length - decimals, 0, ".");
  return Number(array.join(""));
}

export const getTokenMetadata = (tokenMint: anchor.web3.PublicKey) => {
  const [tokenMetadataAddress] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
    METADATA_PROGRAM_ID
  );
  return tokenMetadataAddress;
};

export const spendableActionPoints = (participant: ParticipantAccount, battleground: BattlegroundAccount) => {
  return Math.floor(
    ((Date.now() / 1000 - battleground.startTime.toNumber()) / 86400) * battleground.actionPointsPerDay -
      participant.actionPointsSpent
  );
};

export const isPartOfCollection = (metadata: Metadata, collection: CollectionInfo) => {
  if (collection.v2) {
    return metadata.collection?.address.equals(collection.v2.collectionMint);
  } else {
    return metadata.creators
      .map((e) => e.address.toString())
      .every((e) => collection.v1?.verifiedCreators.map((e) => e.toString()).includes(e));
  }
};

export const minHp = () => {
  return 750 + 50 * 5;
};

export const maxHp = (defense: number) => {
  return 750 + (50 + defense) * 5;
};
export const maxAttack = () => {
  return 200;
};
export const maxDefense = () => {
  return 150;
};
