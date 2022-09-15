import { maxAttack, maxDefense, maxHp } from "../utils";

import { ParticipantAccount } from "../hooks/useBattleground";
import React from "react";

export default function ParticipantStatistics({
  participant,
  detailed,
}: {
  participant: ParticipantAccount;
  detailed?: boolean;
}) {
  return (
    <table className="table table-compact">
      <tr>
        <th className="w-min p-1">
          {detailed ? (
            <div className="tooltip" data-tip="You are eliminated when it reaches 0.">
              HP
            </div>
          ) : (
            "HP"
          )}
        </th>
        <td className="w-full p-0">
          <progress
            className="progress progress-info w-full my-auto"
            value={participant.healthPoints}
            max={maxHp(participant.defense)}
          />
        </td>
        {detailed && (
          <td className="w-min p-1">
            {participant.healthPoints} / {maxHp(participant.defense)}
          </td>
        )}
      </tr>
      <tr>
        <th className="w-min p-1">
          {detailed ? (
            <div className="tooltip" data-tip="Influences how much damage you deal.">
              Attack
            </div>
          ) : (
            "Attack"
          )}
        </th>
        <td className="w-full p-0">
          <progress className="progress progress-accent w-full my-auto" value={participant.attack} max={maxAttack()} />
        </td>
        {detailed && (
          <td className="w-min p-1">
            {participant.attack} / {maxAttack()}
          </td>
        )}
      </tr>
      <tr>
        <th className="w-min p-1">
          {detailed ? (
            <div className="tooltip" data-tip="Influences how much you heal.">
              Defense
            </div>
          ) : (
            "Defense"
          )}
        </th>
        <td className="w-full p-0">
          <progress
            className="progress progress-success w-full my-auto"
            value={participant.defense}
            max={maxDefense()}
          />
        </td>
        {detailed && (
          <td className="w-min p-1">
            {participant.defense} / {maxDefense()}
          </td>
        )}
      </tr>
    </table>
  );
}
