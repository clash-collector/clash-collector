import { Metadata, Metaplex } from "@metaplex-foundation/js";
import React, { ChangeEvent, useEffect, useState } from "react";

import { APP_NAME } from "../../constants";
import CollectionCard from "./CollectionCard";
import Hero from "../../components/Hero";
import { Link } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import View from "../../components/View";
import logo from "../../assets/logo.svg";
import useCollections from "../../hooks/useCollections";
import { useConnection } from "@solana/wallet-adapter-react";
import useRisk from "../../hooks/useRisk";

export default function Collections() {
  const { risk } = useRisk();
  const collections = useCollections();
  const [key, setKey] = useState<PublicKey>();

  const handleUpdateAddress = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const key = new PublicKey(e.target.value);
      setKey(key);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Hero
        image={<img src={logo} className="logo font-primary w-32 h-32 mx-auto" alt={APP_NAME} />}
        content={
          <>
            <span className="text-4xl font-bold text-center">{APP_NAME}</span>
            <span className="text-xl font-bold">Solana's on-chain Battle Royale</span>
            <span className="text-lg">Invite NFT holders of a collection to a deathmatch.</span>
            <span className="text-md">Pay a ticket to participate, winner takes all.</span>
          </>
        }
      />
      <div className="mt-10">
        {risk && (
          <div className="border p-3 w-fit mx-auto rounded-box shadow-lg mb-2">
            <div className="flex flex-row gap-3 justify-center">
              <div className="flex flex-col">
                <div className="text-lg">Go to a collection</div>
                <div className="font-small text-base-300">It needs to be a Metaplex Certified Collection</div>
              </div>
              <input
                className="input input-bordered m-1"
                placeholder="Collection mint..."
                onChange={handleUpdateAddress}
              />
              <div className="my-auto h-100">
                {key ? (
                  <Link to={`/collection/${key.toString()}`}>
                    <div className="btn btn-primary">Go !</div>
                  </Link>
                ) : (
                  <div className="btn btn-active btn-ghost">Go !</div>
                )}
              </div>
            </div>
          </div>
        )}
        <span className="text-xl">Available collections</span>
        <hr />
        <div className="flex flex-row flex-wrap">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </View>
  );
}
