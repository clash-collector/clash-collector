import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BattlegroundAccount, ParticipantAccount } from "../../hooks/useBattleground";
import { shortAddress, spendableActionPoints } from "../../utils";

export default function FightingParticipantCard({
  participant,
  battleground,
}: {
  participant: ParticipantAccount;
  battleground: BattlegroundAccount;
}) {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    let interval = setInterval(() => setPoints(spendableActionPoints(participant, battleground)), 1000);
    return clearInterval(interval);
  }, [participant, battleground]);

  return (
    <div className="rounded-2xl border-2 w-72 m-5">
      <div>{/* <img src={participant.bump} alt="Profile picture" className="rounded-t-2xl" /> */}</div>
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-3xl font-bold">{shortAddress(participant.nftMint)}</span>
        <div className="flex flex-col text-start">
          <span className="text-xl font-bold">HP left: {participant.healthPoints}</span>
          <span className="text-xl font-bold">Attack: {participant.attack}</span>
          <span className="text-xl font-bold">Defense: {participant.defense}</span>
          <span className="text-xl font-bold">Action points left: {points}</span>
        </div>
        {battleground.status["ongoing"] && (
          <Link to={`/participant/${participant.publicKey.toString()}`}>
            <button className="btn btn-secondary w-full">Spend action points</button>
          </Link>
        )}
      </div>
    </div>
  );
}
