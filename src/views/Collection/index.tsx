import { RefreshIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import View from "../../components/View";
import { BattlegroundAccount } from "../../hooks/useBattleground";
import useBattleRoyale from "../../hooks/useBattleRoyale";
import useCollections from "../../hooks/useCollections";
import useProvider from "../../hooks/useProvider";
import BattlegroundCard from "./BattlegroundCard";
import CreateBattlegroundModal from "./CreateBattlegroundModal";

export default function Collection() {
  let { collectionId } = useParams();
  const collections = useCollections();
  const collection = collections.find((e) => e.id === collectionId);
  const provider = useProvider();
  const { gameMaster, fetchBattlegroundsByCollection } = useBattleRoyale();
  const [battlegrounds, setBattlegrounds] = useState<BattlegroundAccount[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetch = async () => {
    if (!collection) return;
    setBattlegrounds(await fetchBattlegroundsByCollection(collection));
  };

  useEffect(() => {
    fetch();
  }, [collection, provider?.publicKey]);

  return (
    <View>
      <Hero
        image={<img src={collection?.profile} className="logo w-48 h-48 mx-auto rounded-full" alt={collection?.name} />}
        title={collection?.name}
        backLink={{ uri: "/", tooltip: "Go back to all collections" }}
      />
      <div className="mt-10">
        <div className="flex flex-row justify-between">
          <span className="text-xl my-auto">Battlegrounds</span>
          <div>
            {collection && provider?.publicKey && gameMaster?.equals(provider.publicKey) && (
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
        <div className="flex flex-row flex-wrap">
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
