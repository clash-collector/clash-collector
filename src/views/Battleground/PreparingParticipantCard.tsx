import React, { useState } from "react";
import toast from "react-hot-toast";
import { NftAccount } from "../../contexts/UserNfts";
import { ProgramMethodCallbacks } from "../../hooks/useBattleground";
import useMetadata from "../../hooks/useMetadata";

export default function PreparingParticipantCard({
  token,
  joinBattleground,
}: {
  token: NftAccount;
  joinBattleground: (
    token: NftAccount,
    attack: number,
    defense: number,
    whitelistProof?: number[][] | null,
    callbacks?: ProgramMethodCallbacks
  ) => Promise<void>;
}) {
  const [characteristics, setCharacteristics] = useState<number>(50);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInflight, setIsInflight] = useState<boolean>(false);

  const metadata = useMetadata(token.key);

  console.log(metadata);

  const handleSendToBattle = async () => {
    setIsInflight(true);
    await joinBattleground(token, characteristics, 100 - characteristics, null, {
      onSuccess: () => {
        toast.success(`Token ${token.name} entered the battleground`);
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
    setIsOpen(false);
    setIsInflight(false);
  };

  return (
    <div className="rounded-2xl border-2 w-72 m-5">
      {metadata && metadata.json && (
        <div>
          <img src={metadata.json.image} alt="Profile picture" className="rounded-t-2xl" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-3 text-center">
        <span className="text-3xl font-bold">{token.name}</span>
        <span className="text-lg">{token.symbol}</span>
        <button className="btn btn-secondary" onClick={() => setIsOpen(true)}>
          Send to battle
        </button>
        <label className={`modal cursor-pointer ${isOpen ? "modal-open" : ""}`}>
          <label className="modal-box relative" onClick={(e) => e.preventDefault()}>
            <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>
              ✕
            </label>
            <h3 className="text-xl font-bold">Send {} to the battleground</h3>
            <hr />
            <div className="flex flex-col gap-2 my-2">
              <div className="w-full justify-start">
                <span className="w-min font-bold">Characteristics</span>
                <div className="flex flex-row gap-3 m-2">
                  <span>Defense</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="range"
                    onChange={(e) => setCharacteristics(Number(e.target.value))}
                  />
                  <span>Attack</span>
                </div>
              </div>
              <button className={`btn btn-primary ${isInflight ? "loading" : ""}`} onClick={() => handleSendToBattle()}>
                Confirm
              </button>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
}
