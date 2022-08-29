import React from "react";
import { Link } from "react-router-dom";
import TokenIcon from "../../components/TokenIcon";
import { BattlegroundAccount } from "../../hooks/useBattleground";

interface BattlegroundCardProps {
  battleground: BattlegroundAccount;
}

export default function BattlegroundCard({ battleground }: BattlegroundCardProps) {
  return (
    <div key={battleground.id.toString()} className="rounded-2xl border-2 m-5 shadow-xl">
      <div className="p-3">
        <h3 className="text-center text-3xl font-bold">Battleground #{battleground.id.toString()}</h3>
        <ul className="flex flex-col gap-3 justify-start m-2">
          <li className="text-2xl whitespace-nowrap">
            Status: {battleground.status["preparing"] ? "Preparation" : "Battle"}
          </li>
          <li className="flex text-2xl whitespace-nowrap">
            <span>Pot token:</span> <TokenIcon mint={battleground.potMint} explorer />
          </li>
        </ul>
        <Link to={`/battleground/${battleground.id.toString()}`}>
          <button className="btn btn-primary w-full">View this battleground</button>
        </Link>
      </div>
    </div>
  );
}
