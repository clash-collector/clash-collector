import { ArrowLeftIcon } from "@heroicons/react/outline";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import View from "../../components/View";
import useMetadata from "../../hooks/useMetadata";
import useParticipant from "../../hooks/useParticipant";
import { shortAddress } from "../../utils";
import TargetCard from "./TargetCard";

export default function Participant() {
  let { participantId } = useParams();
  const { participant, participants, battleground, participantAction } = useParticipant(
    participantId ? new PublicKey(participantId) : undefined
  );
  const metadata = useMetadata(participant?.nftMint);

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
            <div className="align-center">
              {metadata && metadata.json && (
                <img src={metadata.json.image} alt="Profile picture" className="rounded-full w-32 h-32 mx-auto" />
              )}
              <span className="text-6xl font-bold text-center">Participant {shortAddress(participant?.publicKey)}</span>
            </div>
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
          <div className="mt-5">
            <span className="text-2xl font-bold">Targets</span>
            <hr />
            <div className="mt-10 flex flex-row flex-wrap gap-5">
              {battleground &&
                participants?.map((e) => (
                  <TargetCard source={participant} target={e} battleground={battleground} action={participantAction} />
                ))}
            </div>
          </div>
        </>
      )}
    </View>
  );
}
