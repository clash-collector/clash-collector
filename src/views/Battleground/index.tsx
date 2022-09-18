import React, { useMemo, useState } from "react";

import FightingParticipantCard from "./FightingParticipantCard";
import Hero from "../../components/Hero";
import PreparingParticipantCard from "./PreparingParticipantCard";
import TokenIcon from "../../components/TokenIcon";
import View from "../../components/View";
import deepEqual from "deep-equal";
import { isPartOfCollection } from "../../utils";
import toast from "react-hot-toast";
import useBattleground from "../../hooks/useBattleground";
import useCollections from "../../hooks/useCollections";
import { useParams } from "react-router-dom";
import useUserNfts from "../../hooks/useUserNfts";

export default function Battleground() {
  let { battlegroundId } = useParams();
  const collections = useCollections();
  const { battleground, startBattle, joinBattleground, finishBattle } = useBattleground({ id: Number(battlegroundId) });
  const parentCollection = collections.find((e) => deepEqual(e.info, battleground?.collectionInfo));
  const { tokens, userParticipants, fetchUserParticipants } = useUserNfts();
  const [isConfirming, setIsConfirming] = useState(false);

  const battlegroundUserParticipants = useMemo(() => {
    return userParticipants?.filter((e) => battleground && e.battleground.equals(battleground.publicKey));
  }, [battleground, userParticipants]);

  // TODO: Refresh participants when alive does not match participant count

  const handleStartBattle = async () => {
    setIsConfirming(true);
    await startBattle({
      onSuccess: () => {
        toast.success(`Restarted the battleground!`);
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
    setIsConfirming(false);
  };

  const handleFinishBattle = async () => {
    await finishBattle({
      onSuccess: () => {
        toast.success(`Restarted the battleground!`);
        fetchUserParticipants();
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
  };

  console.log(battleground);
  return (
    <View>
      <Hero
        backLink={
          parentCollection && {
            uri: `/collection/${parentCollection.id}`,
            tooltip: `Go back to ${parentCollection.name}`,
          }
        }
        title={`Battleground #${battlegroundId}`}
        content={
          <>
            <div className="stats shadow mt-5 flex flex-row">
              <div className="stat">
                <div className="stat-title">Participants</div>
                <div className="stat-value flex flex-row align-middle">
                  <div className="w-min mx-auto">
                    {battleground ? battleground.participants : "??"} / {battleground?.participantsCap || "??"}
                  </div>
                </div>
                <div className="stat-desc">The battle start when it's full</div>
              </div>
              <div className="stat">
                <div className="stat-title">Ticket price</div>
                <div className="stat-value">{battleground?.ticketPrice}</div>
                <div className="stat-desc text-base-800">
                  <div className="w-min mx-auto">
                    <TokenIcon mint={battleground?.potMint} explorer />
                  </div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Pot</div>
                <div className="stat-value">{battleground?.potValue}</div>
                <div className="stat-desc text-base-800">
                  <div className="w-min mx-auto">
                    <TokenIcon mint={battleground?.potMint} explorer />
                  </div>
                </div>
              </div>
            </div>
            {battleground && (
              <>
                {battleground.status["preparing"] && battleground.participants === battleground.participantsCap && (
                  <div
                    className={`btn btn-accent mt-5 ${isConfirming ? "loading" : ""}`}
                    onClick={() => handleStartBattle()}
                  >
                    Start the battle
                  </div>
                )}
                {battleground.status["ongoing"] &&
                  (battleground.participants === 1 ? (
                    <button
                      className={`btn btn-success w-full mt-5 ${isConfirming ? "loading" : ""}`}
                      onClick={() => handleFinishBattle()}
                    >
                      Send prize and restart battleground
                    </button>
                  ) : (
                    <div className="animate-bounce mt-5">
                      <span className=" text-2xl font bold">The battle has begun!</span>
                    </div>
                  ))}
              </>
            )}
          </>
        }
      />
      <div className="mt-10">
        {battleground && battlegroundUserParticipants && battlegroundUserParticipants.length > 0 && (
          <>
            <span className="text-3xl">Your participants</span>
            <hr />
            <div className="flex flex-row flex-wrap justify-center">
              {battlegroundUserParticipants
                .filter((e) => e.battleground.equals(battleground.publicKey))
                .map((participant) => (
                  <FightingParticipantCard
                    key={participant.nftMint.toString()}
                    participant={participant}
                    battleground={battleground}
                  />
                ))}
            </div>
          </>
        )}
        {battleground &&
          battleground.status["preparing"] &&
          tokens &&
          battleground.participants < battleground.participantsCap && (
            <>
              <span className="text-3xl">Your potential participants</span>
              <hr />
              <div className="flex flex-row flex-wrap justify-center">
                {tokens
                  .filter(
                    (token) => !userParticipants?.find((participant) => participant.nftMint.equals(token.mintAddress))
                  )
                  .filter((token) => isPartOfCollection(token, battleground.collectionInfo))
                  .map((token) => (
                    <PreparingParticipantCard
                      key={token.mintAddress.toString()}
                      token={token}
                      battleground={battleground}
                      joinBattleground={joinBattleground}
                    />
                  ))}
              </div>
            </>
          )}
      </div>
    </View>
  );
}
