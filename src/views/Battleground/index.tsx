import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import deepEqual from "deep-equal";
import View from "../../components/View";
import { collections } from "../../constants";
import { NftAccount } from "../../contexts/UserNfts";
import useBattleground from "../../hooks/useBattleground";
import useUserNfts from "../../hooks/useUserNfts";
import FightingParticipantCard from "./FightingParticipantCard";
import PreparingParticipantCard from "./PreparingParticipantCard";
import toast from "react-hot-toast";

export default function Battleground() {
  let { battlegroundId } = useParams();
  const { battleground, startBattle, joinBattleground, finishBattle } = useBattleground({ id: Number(battlegroundId) });
  const parentCollection = collections.find((e) => deepEqual(e.info, battleground?.collectionInfo));
  const { tokens, userParticipants } = useUserNfts();

  const battlegroundUserParticipants = useMemo(() => {
    return userParticipants?.filter((e) => battleground && e.battleground.equals(battleground.publicKey));
  }, [battleground, userParticipants]);

  const handleStartBattle = async () => {
    await startBattle();
  };

  const handleFinishBattle = async () => {
    await finishBattle({
      onSuccess: () => {
        toast.success(`Restarted the battleground!`);
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
  };

  console.log(battleground, userParticipants);

  return (
    <View>
      <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <div className="flex flex-col align-center">
          {parentCollection && (
            <Link to={`/collection/${parentCollection.id}`} className="absolute">
              <button className="btn btn-outline my-auto">
                <ArrowLeftIcon className="w-8 h-8" />
              </button>
            </Link>
          )}
          <span className="text-6xl font-bold text-center">Battleground #{battlegroundId}</span>
        </div>
        <div className="stats shadow mt-5 flex flex-row">
          <div className="stat">
            <div className="stat-title">
              {battleground?.status["preparing"] ? "Subscribed" : "Fighting"} participants
            </div>
            <div className="stat-value">{battleground?.participants}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Max # of participants</div>
            <div className="stat-value">{battleground?.participantsCap || "??"}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Ticket price</div>
            <div className="stat-value">{battleground?.ticketPrice}</div>
            <div className="stat-desc">See on Solana.fm</div>
          </div>
        </div>
        {battleground &&
          battleground.status["preparing"] &&
          battleground.participants === battleground.participantsCap && (
            <div className="btn btn-accent mt-5" onClick={() => handleStartBattle()}>
              Start the battle
            </div>
          )}
        {battleground && battleground.status["ongoing"] && battleground.participants === 1 ? (
          <button className="btn btn-success w-full mt-5" onClick={() => handleFinishBattle()}>
            Send prize and restart battleground
          </button>
        ) : (
          <div className="animate-bounce mt-5">
            <span className=" text-2xl font bold">The battle has begun!</span>
          </div>
        )}
      </div>
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
        {battleground && battleground.status["preparing"] && tokens && (
          <>
            <span className="text-3xl">Your potential participants</span>
            <hr />
            <div className="flex flex-row flex-wrap justify-center">
              {tokens
                .filter((token) => !userParticipants?.find((participant) => participant.nftMint.equals(token.key)))
                .map((token) => (
                  <PreparingParticipantCard
                    key={token.key.toString()}
                    token={token}
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
