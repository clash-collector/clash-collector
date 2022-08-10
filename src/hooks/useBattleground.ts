import * as anchor from "@project-serum/anchor";
import { BN, IdlAccounts, Program } from "@project-serum/anchor";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NftAccount } from "../contexts/UserNfts";
import {
  BattleRoyaleProgram,
  BattleRoyaleIdl,
  BATTLE_ROYALE_PROGRAM_ID,
  BATTLEGROUND_STATE_SEEDS,
  BATTLEGROUND_AUTHORITY_SEEDS,
  PARTICIPANT_STATE_SEEDS,
} from "../programs/battleRoyale";
import { getTokenMetadata } from "../utils";
import useBattleRoyale from "./useBattleRoyale";
import useProvider from "./useProvider";

export declare type BaseBattlegroundAccount = IdlAccounts<BattleRoyaleProgram>["battlegroundState"];
export interface BattlegroundAccount extends BaseBattlegroundAccount {
  publicKey: PublicKey;
  potValue: number;
  ticketPrice: number;
}
export declare type BaseParticipantAccount = IdlAccounts<BattleRoyaleProgram>["participantState"];
export interface ParticipantAccount extends BaseParticipantAccount {
  publicKey: PublicKey;
}

export default function useBattleground(id?: number) {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const { gameMaster, battleRoyale } = useBattleRoyale();
  const [battleground, setBattleground] = useState<BattlegroundAccount>();
  const [participants, setParticipants] = useState<ParticipantAccount[]>();

  const fetchState = async () => {
    if (typeof id !== "number" || !program) return;

    const [authorityAddress] = PublicKey.findProgramAddressSync(
      [BATTLEGROUND_AUTHORITY_SEEDS, new anchor.BN(id).toArrayLike(Buffer, "le", 8)],
      BATTLE_ROYALE_PROGRAM_ID
    );
    const [battlegroundAddress] = PublicKey.findProgramAddressSync(
      [BATTLEGROUND_STATE_SEEDS, new anchor.BN(id).toArrayLike(Buffer, "le", 8)],
      BATTLE_ROYALE_PROGRAM_ID
    );

    const state = await program.account.battlegroundState.fetch(battlegroundAddress);
    const mint = await getMint(program.provider.connection, state.potMint);
    try {
      const potAccount = await getAccount(
        program.provider.connection,
        await getAssociatedTokenAddress(state.potMint, authorityAddress, true)
      );

      setBattleground({
        ...state,
        potValue:
          new anchor.BN(potAccount.amount.toString()).toNumber() / new anchor.BN(10 ** mint.decimals).toNumber(),
        ticketPrice:
          new anchor.BN(state.entryFee.toString()).toNumber() / new anchor.BN(10 ** mint.decimals).toNumber(),
        publicKey: battlegroundAddress,
      } as any);
    } catch (e) {
      setBattleground({
        ...state,
        potValue: 0,
        ticketPrice:
          new anchor.BN(state.entryFee.toString()).toNumber() / new anchor.BN(10 ** mint.decimals).toNumber(),
        publicKey: battlegroundAddress,
      } as any);
    }
  };

  useEffect(() => {
    if (!battleground) {
      fetchState();
    }
  }, [battleground]);

  const fetchParticipants = async () => {
    console.log(program, battleground);
    if (!program || !battleground) return;

    const accounts = await program.account.participantState.all([
      { memcmp: { offset: 9, bytes: battleground.publicKey.toString() } },
    ]);
    console.log(accounts);
    setParticipants(accounts.map((e) => ({ ...e.account, publicKey: e.publicKey })) as any);
  };

  useEffect(() => {
    if (!participants) {
      fetchParticipants();
    }
  }, [battleground, participants]);

  const joinBattleground = useCallback(
    async (token: NftAccount, attack: number, defense: number, whitelistProof: number[][] | null = null) => {
      if (!program || !provider || !battleground || !gameMaster) return;

      const [authorityAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_AUTHORITY_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const [battlegroundAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_STATE_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const [participantAddress] = PublicKey.findProgramAddressSync(
        [PARTICIPANT_STATE_SEEDS, battlegroundAddress.toBuffer(), token.key.toBuffer()],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const potAccount = await getAssociatedTokenAddress(battleground.potMint, authorityAddress, true);
      const devAccount = await getAssociatedTokenAddress(battleground.potMint, gameMaster, true);
      const playerAccount = await getAssociatedTokenAddress(battleground.potMint, provider.publicKey, true);
      const playerNftTokenAccount = await getAssociatedTokenAddress(token.key, provider.publicKey, true);
      const tokenMetadata = getTokenMetadata(token.key);

      const tx = await program.methods
        .joinBattleground(attack, defense, whitelistProof)
        .accounts({
          signer: program.provider.publicKey,
          gameMaster,
          battleRoyale,
          authority: authorityAddress,
          battleground: battlegroundAddress,
          participant: participantAddress,
          potMint: battleground.potMint,
          nftMint: token.key,
          nftMetadata: tokenMetadata,
          potAccount,
          devAccount,
          playerAccount,
          playerNftTokenAccount,
        })
        .rpc();
      await program.provider.connection.confirmTransaction(tx);
      await fetchState();
    },
    [program]
  );

  const startBattle = useCallback(async () => {
    if (!program || !provider || !battleground || !gameMaster) return;

    const [battlegroundAddress] = PublicKey.findProgramAddressSync(
      [BATTLEGROUND_STATE_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
      BATTLE_ROYALE_PROGRAM_ID
    );

    const tx = await program.methods
      .startBattle()
      .accounts({
        battleRoyale,
        battleground: battlegroundAddress,
        clock: SYSVAR_CLOCK_PUBKEY,
      })
      .rpc();
    await program.provider.connection.confirmTransaction(tx);
    await fetchState();
  }, [program]);

  return { battleground, participants, joinBattleground, startBattle };
}
