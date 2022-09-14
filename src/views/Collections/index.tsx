import { Idl, Program } from "@project-serum/anchor";
import { PROGRAM_ID as METADATA_PROGRAM_ID, Metadata } from "@metaplex-foundation/mpl-token-metadata";
import React, { useMemo } from "react";

import { APP_NAME } from "../../constants";
import CollectionCard from "./CollectionCard";
import Hero from "../../components/Hero";
import { Metaplex } from "@metaplex-foundation/js";
import MplIdl from "../../programs/mpl/idl.json";
import View from "../../components/View";
import logo from "../../assets/logo.svg";
import useCollections from "../../hooks/useCollections";
import { useConnection } from "@solana/wallet-adapter-react";
import useProvider from "../../hooks/useProvider";

export default function Collections() {
  const provider = useProvider();
  const collections = useCollections();

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
