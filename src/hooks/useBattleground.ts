import * as anchor from "@project-serum/anchor";

import {
  BATTLEGROUND_AUTHORITY_SEEDS,
  BATTLEGROUND_STATE_SEEDS,
  BATTLE_ROYALE_PROGRAM_ID,
  BattleRoyaleIdl,
  BattleRoyaleProgram,
  PARTICIPANT_STATE_SEEDS,
} from "../programs/battleRoyale";
import { IdlAccounts, Program } from "@project-serum/anchor";
import { PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { formatBN, getTokenMetadata } from "../utils";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Metadata } from "@metaplex-foundation/js";
import useBattleRoyale from "./useBattleRoyale";
import useProvider from "./useProvider";
import useUserNfts from "./useUserNfts";

export declare type BaseBattlegroundAccount = IdlAccounts<BattleRoyaleProgram>["battlegroundState"];
export interface BattlegroundAccount extends BaseBattlegroundAccount {
  publicKey: PublicKey;
  potValue: number;
  ticketPrice: number;
  totalFee: number;
}
export declare type BaseParticipantAccount = IdlAccounts<BattleRoyaleProgram>["participantState"];
export interface ParticipantAccount extends BaseParticipantAccount {
  publicKey: PublicKey;
}

export interface ProgramMethodCallbacks {
  onError?: (error: any) => void;
  onSuccess?: () => void;
}

export default function useBattleground({ id, publicKey }: { id?: number; publicKey?: PublicKey }) {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const { fetchUserParticipants } = useUserNfts();
  const { gameMaster, battleRoyale } = useBattleRoyale();
  const [battleground, setBattleground] = useState<BattlegroundAccount>();
  const [participants, setParticipants] = useState<ParticipantAccount[]>();

  const fetchState = async () => {
    if ((!publicKey && typeof id !== "number") || !program) return;

    let authorityAddress: PublicKey;
    let battlegroundAddress: PublicKey;
    if (publicKey) {
      battlegroundAddress = publicKey;
    } else {
      [battlegroundAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_STATE_SEEDS, new anchor.BN(id!).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
    }

    const state = await program.account.battlegroundState.fetch(battlegroundAddress);
    const mint = await getMint(program.provider.connection, state.potMint);
    try {
      [authorityAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_AUTHORITY_SEEDS, state.id.toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const potAccount = await getAccount(
        program.provider.connection,
        await getAssociatedTokenAddress(state.potMint, authorityAddress, true)
      );

      setBattleground({
        ...state,
        potValue: formatBN(new anchor.BN(potAccount.amount.toString()), mint.decimals),
        ticketPrice: formatBN(state.entryFee, mint.decimals),
        publicKey: battlegroundAddress,
      } as any);
    } catch (e) {
      setBattleground({
        ...state,
        potValue: 0,
        ticketPrice: formatBN(state.entryFee, mint.decimals),
        publicKey: battlegroundAddress,
      } as any);
    }
  };

  useEffect(() => {
    if (!battleground) {
      fetchState();
    }
  }, [battleground, publicKey, id, provider?.publicKey]);

  const fetchParticipants = async () => {
    if (!program || !battleground) return;

    const accounts = await program.account.participantState.all([
      { memcmp: { offset: 9, bytes: battleground.publicKey.toString() } },
    ]);
    setParticipants(accounts.map((e) => ({ ...e.account, publicKey: e.publicKey })) as any);
  };

  useEffect(() => {
    fetchParticipants();
  }, [battleground, id, publicKey]);

  // Auto refresh data
  useEffect(() => {
    let interval = setInterval(() => {
      fetchState();
      fetchParticipants();
    }, 15000);

    return () => clearInterval(interval);
  });

  const joinBattleground = useCallback(
    async (
      token: Metadata,
      attack: number,
      defense: number,
      collectionWhitelistProof: number[][] | null = null,
      holderWhitelistProof: number[][] | null = null,
      callbacks: ProgramMethodCallbacks = {}
    ) => {
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
        [PARTICIPANT_STATE_SEEDS, battlegroundAddress.toBuffer(), token.mintAddress.toBuffer()],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const potAccount = await getAssociatedTokenAddress(battleground.potMint, authorityAddress, true);
      const devAccount = await getAssociatedTokenAddress(battleground.potMint, gameMaster, true);
      const creatorAccount = await getAssociatedTokenAddress(battleground.potMint, battleground.creator, true);
      const playerAccount = await getAssociatedTokenAddress(battleground.potMint, provider.publicKey, true);
      const playerNftTokenAccount = await getAssociatedTokenAddress(token.mintAddress, provider.publicKey, true);
      const tokenMetadata = getTokenMetadata(token.mintAddress);

      try {
        const tx = await program.methods
          .joinBattleground(attack, defense, collectionWhitelistProof, holderWhitelistProof)
          .accounts({
            signer: program.provider.publicKey,
            devFund: gameMaster,
            battleRoyale: battleRoyale?.publicKey,
            authority: authorityAddress,
            battleground: battlegroundAddress,
            creator: battleground.creator,
            participant: participantAddress,
            potMint: battleground.potMint,
            nftMint: token.mintAddress,
            nftMetadata: tokenMetadata,
            potAccount,
            devAccount,
            creatorAccount,
            playerAccount,
            playerNftTokenAccount,
          })
          .rpc({ commitment: "confirmed" });
        await program.provider.connection.confirmTransaction(tx);
        await fetchState();
        await fetchUserParticipants();
        if (callbacks.onSuccess) callbacks.onSuccess();
      } catch (e) {
        if (callbacks.onError) callbacks.onError(e);
      }
    },
    [program]
  );

  const startBattle = useCallback(
    async (callbacks: ProgramMethodCallbacks = {}) => {
      if (!program || !provider || !battleground || !gameMaster || !battleRoyale) return;

      const [battlegroundAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_STATE_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );

      try {
        const tx = await program.methods
          .startBattle()
          .accounts({
            battleRoyale: battleRoyale.publicKey,
            battleground: battlegroundAddress,
            clock: SYSVAR_CLOCK_PUBKEY,
          })
          .rpc({ commitment: "confirmed" });
        await program.provider.connection.confirmTransaction(tx);
        await fetchState();
        callbacks?.onSuccess && callbacks.onSuccess();
      } catch (e) {
        callbacks?.onError && callbacks.onError(e);
      }
    },
    [program]
  );

  const finishBattle = useCallback(
    async (callbacks: ProgramMethodCallbacks = {}) => {
      console.log(battleRoyale, gameMaster, battleground);
      if (!program || !provider || !battleground || !gameMaster || !battleRoyale) return;

      const winner = participants?.find((e) => e.alive);
      if (!winner) return;

      const [authorityAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_AUTHORITY_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const [battlegroundAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_STATE_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const [participantAddress] = PublicKey.findProgramAddressSync(
        [PARTICIPANT_STATE_SEEDS, battlegroundAddress.toBuffer(), winner.nftMint.toBuffer()],
        BATTLE_ROYALE_PROGRAM_ID
      );

      const potAccount = await getAssociatedTokenAddress(battleground.potMint, authorityAddress, true);
      const winnerAccount = await getAssociatedTokenAddress(battleground.potMint, provider.publicKey, true);
      const winnerNftTokenAccount = await getAssociatedTokenAddress(winner.nftMint, provider.publicKey, true);

      try {
        const tx = await program.methods
          .finishBattle()
          .accounts({
            battleRoyale: battleRoyale.publicKey,
            battleground: battleground.publicKey,
            authority: authorityAddress,
            participant: participantAddress,
            winner: provider.publicKey,
            nftMint: winner.nftMint,
            potMint: battleground.potMint,
            potAccount,
            winnerAccount,
            winnerNftTokenAccount,
          })
          .rpc({ commitment: "confirmed" });
        await program.provider.connection.confirmTransaction(tx);
        await fetchState();
        callbacks?.onSuccess && callbacks.onSuccess();
      } catch (e) {
        callbacks?.onError && callbacks.onError(e);
      }
    },
    [program]
  );

  return { battleground, participants, joinBattleground, startBattle, finishBattle };
}
