import { RefreshIcon, PlusIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import View from "../../components/View";
import { collections } from "../../constants";
import { BattlegroundAccount } from "../../hooks/useBattleground";
import useBattleRoyale from "../../hooks/useBattleRoyale";
import useProvider from "../../hooks/useProvider";
import BattlegroundCard from "./BattlegroundCard";
import CreateBattlegroundModal from "./CreateBattlegroundModal";

export default function Collection() {
  let { collectionId } = useParams();
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
  }, [collection]);

  return (
    <View>
      <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <div className="tooltip absolute" data-tip={`Go back to all collections`}>
          <Link to={`/`}>
            <button className="btn btn-outline my-auto">
              <ArrowLeftIcon className="w-8 h-8" />
            </button>
          </Link>
        </div>
        <img src={collection?.profile} className="logo w-48 h-48 mx-auto rounded-full" alt={collection?.name} />
        <span className="text-6xl font-bold text-center">{collection?.name}</span>
      </div>
      <div className="mt-10">
        <div className="flex flex-row justify-between">
          <span className="text-3xl my-auto">Battleground</span>
          <div>
            {collection && provider?.publicKey && gameMaster?.equals(provider.publicKey) && (
              <>
                <CreateBattlegroundModal collection={collection} isOpen={isOpen} onClose={() => setIsOpen(false)} />
                <div className="btn btn-outline m-2" onClick={() => setIsOpen(true)}>
                  <PlusIcon className="w-8 h-8" />
                </div>
              </>
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
