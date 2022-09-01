import { ArrowLeftIcon } from "@heroicons/react/outline";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "../../components/Hero";
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
          <Hero
            backLink={
              battleground && {
                uri: `/battleground/${battleground.id}`,
                tooltip: `Back to battleground #${battleground?.id}`,
              }
            }
            image={
              metadata &&
              metadata.json && (
                <img src={metadata.json.image} alt="Profile picture" className="rounded-full w-32 h-32 mx-auto" />
              )
            }
            content={
              <>
                <div className="stats shadow mt-5 flex flex-row overflow-x-hidden">
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
                  <div className="tooltip" data-tip={`Go back to battleground ${battleground.id}`}>
                    <Link to={`/battleground/${battleground.id}`}>
                      <button className="btn btn-success mt-5 w-full">You won!</button>
                    </Link>
                  </div>
                )}
              </>
            }
          />
          <div className="mt-5">
            <span className="text-xl font-bold">Targets</span>
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
