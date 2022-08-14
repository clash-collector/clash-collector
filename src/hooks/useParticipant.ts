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

  const fetchState = async () => {
    if (!publicKey || !program) return;

    const state = await program.account.participantState.fetch(publicKey);

    setParticipant({ ...state, publicKey });
  };

  // console.log(battleground, participants);

  useEffect(() => {
    if (!participant) {
      fetchState();
    }
  }, [participant, battleground, publicKey, program]);

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
    if (!program || !provider || !participant || !battleground) return;

    const playerNftTokenAccount = await getAssociatedTokenAddress(participant.nftMint, provider.publicKey, true);

    try {
      const tx = await program.methods
        .participantAction(actionType, pointsToSpend)
        .accounts({
          signer: provider.publicKey,
          battleRoyaleState: battleRoyale,
          battlegroundState: battleground.publicKey,
          participantState: participant.publicKey,
          targetParticipantState: target.publicKey,
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

  return { battleground, participant, participants, participantAction };
}
