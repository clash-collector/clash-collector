import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BattlegroundAccount, ParticipantAccount } from "../../hooks/useBattleground";
import useMetadata from "../../hooks/useMetadata";
import { shortAddress, spendableActionPoints } from "../../utils";

import skullSvg from "../../assets/skull.svg";

export default function FightingParticipantCard({
  participant,
  battleground,
}: {
  participant: ParticipantAccount;
  battleground: BattlegroundAccount;
}) {
  const [points, setPoints] = useState<number>(0);
  const metadata = useMetadata(participant.nftMint);

  useEffect(() => {
    let interval = setInterval(() => setPoints(spendableActionPoints(participant, battleground)), 1000);
    return () => clearInterval(interval);
  }, [participant, battleground]);

  return (
    <div className="rounded-2xl border-2 w-48 m-5">
      {metadata && metadata.json && (
        <div className="relative">
          {!participant.alive && (
            <div className="absolute w-full">
              <img
                src={skullSvg}
                alt="Dead participant"
                className="rounded-full w-72 h-72 mx-auto opacity-50 animate-pulse"
              />
            </div>
          )}
          <img src={metadata.json.image} alt="Profile picture" className="rounded-t-2xl" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-3xl font-bold">{shortAddress(participant.nftMint)}</span>
        <div className="flex flex-col text-start">
          <span className="text-xl font-bold">HP left: {participant.healthPoints}</span>
          <span className="text-xl font-bold">Attack: {participant.attack}</span>
          <span className="text-xl font-bold">Defense: {participant.defense}</span>
          {battleground.status["ongoing"] && <span className="text-xl font-bold">Action points left: {points}</span>}
        </div>
        {battleground.status["ongoing"] && participant.alive && (
          <Link to={`/participant/${participant.publicKey.toString()}`}>
            <button className="btn btn-secondary w-full">Spend action points</button>
          </Link>
        )}
        {battleground.status["preparing"] && !participant.alive && (
          <button className="btn btn-secondary w-full">Leave battleground</button>
        )}
      </div>
    </div>
  );
}
