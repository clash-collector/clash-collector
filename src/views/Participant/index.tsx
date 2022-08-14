import { ArrowLeftIcon } from "@heroicons/react/outline";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import View from "../../components/View";
import useBattleground from "../../hooks/useBattleground";
import useParticipant from "../../hooks/useParticipant";
import useUserNfts from "../../hooks/useUserNfts";
import { shortAddress } from "../../utils";
import TargetCard from "./TargetCard";

export default function Participant() {
  let { participantId } = useParams();
  const { participant, participants, battleground, participantAction } = useParticipant(
    participantId ? new PublicKey(participantId) : undefined
  );
  const { userParticipants } = useUserNfts();

  console.log(participantId, participant, userParticipants, participants, battleground);

  return (
    <View>
      {participant && (
        <>
          <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
            {battleground && (
              <Link to={`/battleground/${battleground.id}`} className="absolute">
                <button className="btn btn-outline">
                  <ArrowLeftIcon className="w-8 h-8" />
                </button>
              </Link>
            )}
            <span className="text-2xl font-bold text-center">Participant {shortAddress(participant?.publicKey)}</span>
            <div className="stats shadow mt-5 flex flex-row">
              <div className="stat">
                <div className="stat-title">Attack</div>
                <div className="stat-value">{participant.attack}</div>
                <div className="stat-desc">Influences how much damage you deal.</div>
              </div>
              <div className="stat">
                <div className="stat-title">Defense</div>
                <div className="stat-value">{participant.defense}</div>
                <div className="stat-desc">Influences how much you heal.</div>
              </div>
              <div className="stat">
                <div className="stat-title">Health Points</div>
                <div className="stat-value">{participant.healthPoints}</div>
                <div className="stat-desc">You are eliminated when it reaches 0.</div>
              </div>
            </div>
            {battleground && participant.alive && battleground?.participants === 1 && (
              <Link to={`/battleground/${battleground.id}`}>
                <button className="btn btn-success mt-5 w-full">You won!</button>
              </Link>
            )}
          </div>
          <div className="mt-10 flex flex-row flex-wrap gap-5">
            {battleground &&
              participants?.map((e) => (
                <TargetCard source={participant} target={e} battleground={battleground} action={participantAction} />
              ))}
          </div>
        </>
      )}
    </View>
  );
}
