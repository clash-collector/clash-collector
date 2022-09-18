import { BattlegroundAccount } from "../../hooks/useBattleground";
import { Link } from "react-router-dom";
import React from "react";
import TokenAmount from "../../components/TokenAmount";
import TokenIcon from "../../components/TokenIcon";

interface BattlegroundCardProps {
  battleground: BattlegroundAccount;
}

export default function BattlegroundCard({ battleground }: BattlegroundCardProps) {
  return (
    <div key={battleground.id.toString()} className="rounded-2xl border-2 m-5 shadow-xl">
      <div className="p-3">
        <h3 className="text-center text-xl font-bold">Battleground #{battleground.id.toString()}</h3>
        <ul className="flex flex-col gap-3 justify-start m-2">
          <li className="flex w-100 justify-between whitespace-nowrap">
            <div>
              <b>Status:</b>
            </div>{" "}
            {battleground.status["preparing"] ? (
              <div className="tooltip" data-tip={"You can still join this battleground"}>
                Preparation ({battleground.participants}/{battleground.participantsCap})
              </div>
            ) : (
              <div className="tooltip" data-tip={"Participants are fighting"}>
                Battle ({battleground.participants}/{battleground.participantsCap})
              </div>
            )}
          </li>
          <li className="flex w-100 justify-between whitespace-nowrap">
            <div>
              <b>Pot token:</b>
            </div>{" "}
            <TokenIcon mint={battleground.potMint} explorer />
          </li>
          <li className="flex w-100 justify-between whitespace-nowrap">
            <div>
              <b>Ticket price:</b>
            </div>{" "}
            <TokenAmount amount={battleground.ticketPrice} mint={battleground.potMint} explorer />
          </li>
          <li className="flex w-100 justify-between whitespace-nowrap">
            <div>
              <b>Total fee:</b>
            </div>{" "}
            <div>{battleground.totalFee / 100}%</div>
          </li>
        </ul>
        <Link to={`/battleground/${battleground.id.toString()}`}>
          <button className="btn btn-primary w-full">View this battleground</button>
        </Link>
      </div>
    </div>
  );
}
