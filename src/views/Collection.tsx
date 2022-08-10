import { Dialog } from "@headlessui/react";
import { RefreshIcon, PlusIcon } from "@heroicons/react/outline";
import { getMint } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import View from "../components/View";
import { collections } from "../constants";
import useBattleRoyale from "../hooks/useBattleRoyale";
import useProvider from "../hooks/useProvider";
import { BATTLE_ROYALE_PROGRAM_ID } from "../programs/battleRoyale";
import { shortAddress } from "../utils";

export default function Collection() {
  let { collectionId } = useParams();
  const collection = collections.find((e) => e.id === collectionId);
  const provider = useProvider();
  const { gameMaster, fetchBattlegroundsByCollection, createBattleground } = useBattleRoyale();
  const [battlegrounds, setBattlegrounds] = useState<any[]>();
  const [ticketToken, setTicketToken] = useState<string>();
  const [ticketCost, setTicketCost] = useState<number>();
  const [participantsCap, setParticipantsCap] = useState<number>();
  const [pointsPerDay, setPointsPerDay] = useState<number>();

  const fetch = async () => {
    if (!collection) return;
    setBattlegrounds(await fetchBattlegroundsByCollection(collection));
  };

  useEffect(() => {
    fetch();
  }, [collection]);

  console.log(collection, battlegrounds);

  const handleCreateBattleground = async () => {
    console.log();
    if (!provider || !collection || !ticketToken || !participantsCap || !pointsPerDay) return;

    const tokenKey = new PublicKey(ticketToken);
    // Fetch the mint to get the decimals
    const mint = await getMint(provider.connection, tokenKey);

    await createBattleground(
      collection,
      tokenKey,
      (ticketCost || 0) * 10 ** mint.decimals,
      participantsCap,
      pointsPerDay
    );
  };

  return (
    <>
      {collection && (
        <>
          <input type="checkbox" id="create-battleground-modal" className="modal-toggle" />
          <label htmlFor="create-battleground-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <label htmlFor="create-battleground-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </label>
              <h3 className="text-xl font-bold">Create a battleground for {collection.name}</h3>
              <hr />
              <div className="flex flex-col gap-2 my-2">
                <div className="w-100 justify-start">
                  <span className="w-min font-bold">Input token</span>
                  <input
                    type="text"
                    placeholder={shortAddress(BATTLE_ROYALE_PROGRAM_ID)}
                    className="input input-bordered w-full"
                    onChange={(e) => setTicketToken(e.target.value)}
                  />
                </div>
                <div className="w-100 justify-start">
                  <span className="w-min font-bold">Ticket cost</span>
                  <input
                    type="number"
                    placeholder="0.1"
                    className="input input-bordered w-full"
                    onChange={(e) => setTicketCost(Number(e.target.value))}
                  />
                </div>
                <div className="w-100 justify-start">
                  <span className="w-min font-bold">Participants cap</span>
                  <input
                    type="number"
                    placeholder="10"
                    className="input input-bordered w-full"
                    onChange={(e) => setParticipantsCap(Number(e.target.value))}
                  />
                </div>
                <div className="w-100 justify-start">
                  <span className="w-min font-bold">Points per day</span>
                  <input
                    type="number"
                    placeholder="10"
                    className="input input-bordered w-full"
                    onChange={(e) => setPointsPerDay(Number(e.target.value))}
                  />
                </div>
                <div>
                  <button className="btn btn-primary w-full" onClick={() => handleCreateBattleground()}>
                    Create
                  </button>
                </div>
              </div>
            </label>
          </label>
        </>
      )}
      <View>
        <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
          <img src={collection?.profile} className="logo w-48 h-48 mx-auto rounded-full" alt={collection?.name} />
          <span className="text-6xl font-bold text-center">{collection?.name}</span>
        </div>
        <div className="mt-10">
          <div className="flex flex-row justify-between">
            <span className="text-3xl my-auto">Battleground</span>
            <div>
              {collection && provider?.publicKey && gameMaster?.equals(provider.publicKey) && (
                <label htmlFor="create-battleground-modal">
                  <div className="btn btn-outline m-2">
                    <PlusIcon className="w-8 h-8" />
                  </div>
                </label>
              )}
              <div onClick={() => fetch()} className="btn btn-outline m-2">
                <RefreshIcon className="w-8 h-8" />
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-row flex-wrap">
            {battlegrounds ? (
              battlegrounds.map((battleground) => (
                <div key={battleground.id.toString()} className="rounded-2xl border-2 m-5 shadow-xl">
                  <div className="p-3">
                    <h3 className="text-center text-3xl font-bold">Battleground #{battleground.id.toString()}</h3>
                    <ul className="justify-start m-2">
                      <li className="text-2xl whitespace-nowrap">
                        Status: {battleground.status["preparing"] ? "Preparation" : "Battle"}
                      </li>
                      <li className="text-2xl whitespace-nowrap">Pot token: {shortAddress(battleground.potMint)}</li>
                    </ul>
                    <Link to={`/battleground/${battleground.id.toString()}`}>
                      <button className="btn btn-primary w-full">View this battleground</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="progress" />
            )}
          </div>
        </div>
      </View>
    </>
  );
}
