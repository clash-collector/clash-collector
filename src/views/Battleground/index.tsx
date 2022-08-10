import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import View from "../../components/View";
import { collections } from "../../constants";
import { NftAccount } from "../../contexts/UserNfts";
import useBattleground from "../../hooks/useBattleground";
import useUserNfts from "../../hooks/useUserNfts";
import FightingParticipantCard from "./FightingParticipantCard";
import PreparingParticipantCard from "./PreparingParticipantCard";

export default function Battleground() {
  let { battlegroundId } = useParams();
  const { battleground, startBattle } = useBattleground(Number(battlegroundId));
  const { tokens, userParticipants } = useUserNfts();

  const handleStartBattle = async () => {
    await startBattle();
  };

  console.log(battleground, userParticipants);

  return (
    <View>
      <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <span className="text-6xl font-bold text-center">Battleground #{battlegroundId}</span>
        <div className="stats shadow mt-5 flex flex-row">
          <div className="stat">
            <div className="stat-title">Subscribed participants</div>
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
        {battleground && battleground.status["ongoing"] && (
          <div className="animate-bounce mt-5">
            <span className=" text-2xl font bold">The battle has begun!</span>
          </div>
        )}
      </div>
      <div className="mt-10">
        {battleground && tokens && (
          <>
            <span className="text-3xl">Your participants</span>
            <hr />
            <div className="flex flex-row flex-wrap justify-center">
              {battleground.status["preparing"] &&
                tokens.map((token) => <PreparingParticipantCard key={token.key.toString()} token={token} />)}
              {battleground.status["ongoing"] &&
                userParticipants &&
                userParticipants
                  .filter((e) => e.battleground.equals(battleground.publicKey))
                  .map((participant) => (
                    <FightingParticipantCard key={participant.nftMint.toString()} participant={participant} />
                  ))}
            </div>
          </>
        )}
      </div>
    </View>
  );
}
