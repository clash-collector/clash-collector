import * as anchor from "@project-serum/anchor";
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { BattlegroundAccount, ParticipantAccount } from "./hooks/useBattleground";

export function shortAddress(address: anchor.web3.PublicKey | string) {
  let result: string;
  if (typeof address !== "string") {
    result = address.toString();
  } else {
    result = address;
  }
  return result.slice(0, 4) + "..." + result.slice(result.length - 4, result.length);
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
