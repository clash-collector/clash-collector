import React from "react";
import { ParticipantAccount } from "../hooks/useBattleground";
import { maxAttack, maxDefense, maxHp } from "../utils";

export default function ParticipantStatistics({ participant }: { participant: ParticipantAccount }) {
  return (
    <table className="table table-compact">
      <tr>
        <th className="w-min p-1">HP</th>
        <td className="w-full p-0">
          <progress
            className="progress progress-info w-full my-auto"
            value={participant.healthPoints}
            max={maxHp(participant.defense)}
          />
        </td>
      </tr>
      <tr>
        <th className="w-min p-1">Attack</th>
        <td className="w-full p-0">
          <progress className="progress progress-accent w-full my-auto" value={participant.attack} max={maxAttack()} />
        </td>
      </tr>
      <tr>
        <th className="w-min p-1">Defense</th>
        <td className="w-full p-0">
          <progress
            className="progress progress-success w-full my-auto"
            value={participant.defense}
            max={maxDefense()}
          />
        </td>
      </tr>
    </table>
  );
}
