import React from "react";
import View from "../../components/View";
import { APP_NAME, collections } from "../../constants";
import logo from "../../assets/logo.svg";
import CollectionCard from "./CollectionCard";

export default function Home() {
  return (
    <View>
      <div className="flex flex-col align-center text-center p-5 bg-gray-100 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <img src={logo} className="logo w-32 h-32 mx-auto" alt={APP_NAME} />
        <span className="text-6xl font-bold text-center">{APP_NAME}</span>
        <span className="text-3xl font-bold">Solana's on-chain Battle Royale</span>
        <span className="text-xl">Invite NFT holders of a collection to a deathmatch.</span>
        <span className="text-xl">Pay a ticket to participate, winner takes all.</span>
      </div>
      <div className="mt-10">
        <span className="text-3xl">Available collections</span>
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
