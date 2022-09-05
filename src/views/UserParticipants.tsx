import useBattleground, { ParticipantAccount } from "../hooks/useBattleground";

import FightingParticipantCard from "./Battleground/FightingParticipantCard";
import React from "react";
import View from "../components/View";
import useUserNfts from "../hooks/useUserNfts";

function Participant({ participant }: { participant: ParticipantAccount }) {
  const { battleground } = useBattleground({ publicKey: participant.publicKey });

  return battleground ? <FightingParticipantCard participant={participant} battleground={battleground} /> : null;
}

export default function UserParticipants() {
  const { userParticipants } = useUserNfts();
  return (
    <View>
      <span className="text-3xl">Your Participants</span>
      <hr />
      <div className="flex flex-row flex-wrap">
        {userParticipants ? (
          userParticipants.length > 0 ? (
            userParticipants.map((e) => <Participant participant={e} />)
          ) : (
            <div className="text-3xl m-auto">You have no tokens</div>
          )
        ) : (
          <div className="progress"></div>
        )}
      </div>
    </View>
  );
}
