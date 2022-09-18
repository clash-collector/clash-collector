import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import React, { useEffect, useMemo, useState } from "react";

import { BattlegroundAccount } from "../../hooks/useBattleground";
import BattlegroundCard from "./BattlegroundCard";
import CreateBattlegroundModal from "./CreateBattlegroundModal";
import Hero from "../../components/Hero";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import View from "../../components/View";
import useBattleRoyale from "../../hooks/useBattleRoyale";
import useCollections from "../../hooks/useCollections";
import { useConnection } from "@solana/wallet-adapter-react";
import { useParams } from "react-router-dom";
import useProvider from "../../hooks/useProvider";
import useRisk from "../../hooks/useRisk";
import { Collection } from "../../constants/collections";

export default function Collection() {
  const { risk } = useRisk();
  const { connection } = useConnection();
  let { collectionQueryString } = useParams();
  const collections = useCollections();
  const [collection, setCollection] = useState<Collection>();

  const fetchCollection = async () => {
    if (!collectionQueryString) return;

    let collection = collections.find((e) => e.id === collectionQueryString);
    if (collection) {
      setCollection(collection);
    } else {
      const key = new PublicKey(collectionQueryString);
      const metadata = await new Metaplex(connection).nfts().findByMint(key).run();
      setCollection({
        id: metadata.symbol,
        name: metadata.name,
        info: { v2: { collectionMint: key } },
        profile: metadata.json.image,
      });
    }
  };

  useEffect(() => {
    if (!collection) fetchCollection();
  }, [collectionQueryString, collections]);

  const provider = useProvider();
  const { gameMaster, battleRoyale, fetchBattlegroundsByCollection } = useBattleRoyale();
  const [battlegrounds, setBattlegrounds] = useState<BattlegroundAccount[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetch = async () => {
    if (!collection) return;
    console.log(collection, await fetchBattlegroundsByCollection(collection));
    setBattlegrounds(await fetchBattlegroundsByCollection(collection));
  };

  useEffect(() => {
    fetch();
  }, [collection, provider?.publicKey, battleRoyale]);

  return (
    <View>
      <Hero
        image={<img src={collection?.profile} className="logo w-48 h-48 mx-auto rounded-full" alt={collection?.name} />}
        title={collection?.name}
        backLink={{ uri: "/collections", tooltip: "Go back to all collections" }}
      />
      <div className="mt-10">
        <div className="flex flex-row justify-between">
          <span className="text-xl my-auto">Battlegrounds</span>
          <div>
            {risk && collection && (
              <>
                <CreateBattlegroundModal collection={collection} isOpen={isOpen} onClose={() => setIsOpen(false)} />
                <div className="btn btn-outline m-2" onClick={() => setIsOpen(true)}>
                  <PlusIcon className="w-4 h-4" />
                </div>
              </>
            )}
            <div onClick={() => fetch()} className="btn btn-outline m-2">
              <RefreshIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-row flex-wrap justify-center">
          {battlegrounds ? (
            battlegrounds.map((battleground) => (
              <BattlegroundCard key={battleground.publicKey.toString()} battleground={battleground} />
            ))
          ) : (
            <div className="progress" />
          )}
        </div>
      </div>
    </View>
  );
}
