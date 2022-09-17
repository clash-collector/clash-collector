import React, { useMemo } from "react";
import useBattleground, { ParticipantAccount } from "../../hooks/useBattleground";

import FightingParticipantCard from "../Battleground/FightingParticipantCard";
import View from "../../components/View";
import useUserNfts from "../../hooks/useUserNfts";

export default function UserParticipants() {
  const { userParticipants } = useUserNfts();

  return (
    <View>
      <span className="text-3xl">Your Participants</span>
      <hr />
      <div className="flex flex-wrap gap-5 p-3">
        {userParticipants ? (
          userParticipants.length > 0 ? (
            userParticipants.map((e) => (
              <div>
                <div className="btn">Go to {e.battleground.toString()}</div>
              </div>
            ))
          ) : (
            <div className="text-3xl m-auto">You have no tokens</div>
          )
        ) : (
          <div className="progress"></div>
        )}
      </div>
      <div className="flex flex-row flex-wrap"></div>
    </View>
  );
}
