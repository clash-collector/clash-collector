import { IdlAccounts, IdlTypes, Program } from "@project-serum/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { BattleRoyaleProgram, BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID } from "../programs/battleRoyale";
import useBattleground, { ParticipantAccount, ProgramMethodCallbacks } from "./useBattleground";
import useBattleRoyale from "./useBattleRoyale";
import useProvider from "./useProvider";

export declare type ActionType = IdlTypes<BattleRoyaleProgram>["ActionType"];

export default function useParticipant(publicKey?: PublicKey) {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const [participant, setParticipant] = useState<ParticipantAccount>();
  const { battleRoyale } = useBattleRoyale();
  const { battleground, participants } = useBattleground({ publicKey: participant?.battleground });

  console.log(battleground, participant, participants);

  const fetchState = async () => {
    if (!publicKey || !program) return;

    const state = await program.account.participantState.fetch(publicKey);

    setParticipant({ ...state, publicKey });
  };

  useEffect(() => {
    if (!participant) {
      fetchState();
    }
  }, [battleground, publicKey, program]);

  // Auto refresh data
  useEffect(() => {
    let interval = setInterval(() => {
      fetchState();
    }, 15000);

    return () => clearInterval(interval);
  });

  const participantAction = async (
    actionType: ActionType,
    target: ParticipantAccount,
    pointsToSpend: number,
    callbacks: ProgramMethodCallbacks
  ) => {
    if (!program || !provider || !participant || !battleground || !battleRoyale) return;

    const playerNftTokenAccount = await getAssociatedTokenAddress(participant.nftMint, provider.publicKey, true);

    try {
      const tx = await program.methods
        .participantAction(actionType, pointsToSpend)
        .accounts({
          signer: provider.publicKey,
          battleRoyaleState: battleRoyale.publicKey,
          battlegroundState: battleground.publicKey,
          participant: participant.publicKey,
          targetParticipant: target.publicKey,
          playerNftTokenAccount,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .rpc();
      await provider.connection.confirmTransaction(tx);
      await fetchState();
      callbacks?.onSuccess && callbacks.onSuccess();
    } catch (e) {
      callbacks?.onError && callbacks.onError(e);
    }
  };

  const leaveBattleground = async (callbacks: ProgramMethodCallbacks) => {
    if (!program || !provider || !participant || !battleground || !battleRoyale) return;

    const playerNftTokenAccount = await getAssociatedTokenAddress(participant.nftMint, provider.publicKey, true);

    try {
      const tx = await program.methods
        .leaveBattleground()
        .accounts({
          signer: provider.publicKey,
          battleRoyale: battleRoyale.publicKey,
          battleground: battleground.publicKey,
          participant: participant.publicKey,
          nftMint: participant.nftMint,
          playerNftTokenAccount,
        })
        .rpc();
      await provider.connection.confirmTransaction(tx);
      setParticipant(undefined);
      callbacks?.onSuccess && callbacks.onSuccess();
    } catch (e) {
      callbacks?.onError && callbacks.onError(e);
    }
  };

  return { battleground, participant, participants, participantAction, leaveBattleground };
}
