import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NftAccount } from "../../contexts/UserNfts";
import useBattleground from "../../hooks/useBattleground";

export default function PreparingParticipantCard({ token }: { token: NftAccount }) {
  let { battlegroundId } = useParams();
  const { joinBattleground } = useBattleground(Number(battlegroundId));
  const [characteristics, setCharacteristics] = useState<number>(50);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSendToBattle = async (token: NftAccount) => {
    await joinBattleground(token, characteristics, 100 - characteristics);
  };

  return (
    <div className="rounded-2xl border-2 w-72 m-5">
      <div>
        <img src={token.uri} alt="Profile picture" className="rounded-t-2xl" />
      </div>
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-3xl font-bold">{token.name}</span>
        <span className="text-lg">{token.symbol}</span>
        <button className="btn btn-secondary" onClick={() => setIsOpen(true)}>
          Send to battle
        </button>
        {/* <input type="checkbox" id={`send-to-battleground-modal-${token.key.toString()}`} className="modal-toggle" /> */}
        <label className={`modal cursor-pointer ${isOpen ? "modal-open" : ""}`}>
          <label className="modal-box relative" onClick={(e) => e.preventDefault()}>
            <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>
              ✕
            </label>
            <h3 className="text-xl font-bold">Send {} to the battleground</h3>
            <hr />
            <div className="flex flex-col gap-2 my-2">
              <div className="w-100 justify-start">
                <span className="w-min font-bold">Characteristics</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="range"
                  onChange={(e) => setCharacteristics(Number(e.target.value))}
                />
              </div>
              <button className="btn btn-primary" onClick={() => handleSendToBattle(token)}>
                Confirm
              </button>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
}
