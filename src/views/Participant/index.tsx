import { Link, useParams } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/outline";
import Hero from "../../components/Hero";
import ParticipantStatistics from "../../components/ParticipantStatistics";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import TargetCard from "./TargetCard";
import View from "../../components/View";
import { shortAddress } from "../../utils";
import useMetadata from "../../hooks/useMetadata";
import useParticipant from "../../hooks/useParticipant";

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
                <ParticipantStatistics participant={participant} detailed />
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
            <div className="mt-10 flex flex-row flex-wrap gap-5 justify-center">
              {battleground &&
                participants?.map((e) => (
                  <TargetCard
                    key={e.publicKey.toString()}
                    source={participant}
                    target={e}
                    battleground={battleground}
                    action={participantAction}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </View>
  );
}
