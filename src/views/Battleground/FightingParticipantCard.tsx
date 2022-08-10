import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NftAccount } from "../../contexts/UserNfts";
import useBattleground, { ParticipantAccount } from "../../hooks/useBattleground";

export default function FightingParticipantCard({ participant }: { participant: ParticipantAccount }) {
  let { battlegroundId } = useParams();
  const { joinBattleground } = useBattleground(Number(battlegroundId));

  console.log(participant);
  return (
    <div className="rounded-2xl border-2 w-72 m-5">
      <div>{/* <img src={participant.bump} alt="Profile picture" className="rounded-t-2xl" /> */}</div>
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-3xl font-bold">{participant.bump}</span>
        <Link to={`/participant/${participant.bump}`}>
          <button className="btn btn-secondary">Spend action points</button>
        </Link>
      </div>
    </div>
  );
}
