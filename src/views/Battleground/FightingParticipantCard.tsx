import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BattlegroundAccount, ParticipantAccount, ProgramMethodCallbacks } from "../../hooks/useBattleground";
import ParticipantStatistics from "../../components/ParticipantStatistics";
import useMetadata from "../../hooks/useMetadata";
import { shortAddress, spendableActionPoints } from "../../utils";

import skullSvg from "../../assets/skull.svg";
import toast from "react-hot-toast";
import useParticipant from "../../hooks/useParticipant";

export default function FightingParticipantCard({
  participant,
  battleground,
}: {
  participant: ParticipantAccount;
  battleground: BattlegroundAccount;
}) {
  const [points, setPoints] = useState<number>(0);
  const [isInflight, setIsInflight] = useState<boolean>(false);
  const metadata = useMetadata(participant.nftMint);
  const { leaveBattleground } = useParticipant(participant.publicKey);

  useEffect(() => {
    let interval = setInterval(() => setPoints(spendableActionPoints(participant, battleground)), 1000);
    return () => clearInterval(interval);
  }, [participant, battleground]);

  const handleLeave = async () => {
    setIsInflight(true);
    await leaveBattleground({
      onSuccess: () => {
        toast.success(`Token ${metadata?.name} left the battleground`);
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
    setIsInflight(false);
  };

  return (
    <div className="rounded-2xl border-2 w-48 m-5">
      {metadata && metadata.json && (
        <div className="relative">
          {!participant.alive && (
            <div className="absolute w-full">
              <img
                src={skullSvg}
                alt="Dead participant"
                className="rounded-full w-48 h-48 mx-auto opacity-50 animate-pulse"
              />
            </div>
          )}
          <img src={metadata.json.image} alt="Profile picture" className="rounded-t-2xl" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-xl font-bold">{metadata?.name ? metadata.name : shortAddress(participant.nftMint)}</span>
        <ParticipantStatistics participant={participant} />
        {battleground.status["ongoing"] && participant.alive && (
          <Link to={`/participant/${participant.publicKey.toString()}`}>
            <button className="btn btn-secondary w-full">
              Spend {spendableActionPoints(participant, battleground)} action points
            </button>
          </Link>
        )}
        {battleground.status["preparing"] && !participant.alive && (
          <button className={`btn btn-secondary w-full ${isInflight ? "loading" : ""}`} onClick={() => handleLeave()}>
            Leave battleground
          </button>
        )}
      </div>
    </div>
  );
}
