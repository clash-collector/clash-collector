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
import useUserNfts from "./useUserNfts";

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
    console.log(provider, program, battleground, publicKey, id);
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
  }, [battleground, publicKey, id]);

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
      token: NftAccount,
      attack: number,
      defense: number,
      whitelistProof: number[][] | null = null,
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
        [PARTICIPANT_STATE_SEEDS, battlegroundAddress.toBuffer(), token.key.toBuffer()],
        BATTLE_ROYALE_PROGRAM_ID
      );
      const potAccount = await getAssociatedTokenAddress(battleground.potMint, authorityAddress, true);
      const devAccount = await getAssociatedTokenAddress(battleground.potMint, gameMaster, true);
      const playerAccount = await getAssociatedTokenAddress(battleground.potMint, provider.publicKey, true);
      const playerNftTokenAccount = await getAssociatedTokenAddress(token.key, provider.publicKey, true);
      const tokenMetadata = getTokenMetadata(token.key);

      try {
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
      if (!program || !provider || !battleground || !gameMaster) return;

      const [battlegroundAddress] = PublicKey.findProgramAddressSync(
        [BATTLEGROUND_STATE_SEEDS, new anchor.BN(battleground.id).toArrayLike(Buffer, "le", 8)],
        BATTLE_ROYALE_PROGRAM_ID
      );

      try {
        const tx = await program.methods
          .startBattle()
          .accounts({
            battleRoyale,
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
      if (!program || !provider || !battleground || !gameMaster) return;

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
            battleRoyale: battleRoyale,
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
