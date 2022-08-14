import React, { useState } from "react";
import toast from "react-hot-toast";
import { BattlegroundAccount, ParticipantAccount, ProgramMethodCallbacks } from "../../hooks/useBattleground";
import { ActionType } from "../../hooks/useParticipant";
import useUserNfts from "../../hooks/useUserNfts";
import { shortAddress, spendableActionPoints } from "../../utils";

export default function TargetCard({
  source,
  target,
  battleground,
  action,
}: {
  source: ParticipantAccount;
  target: ParticipantAccount;
  battleground: BattlegroundAccount;
  action: (
    actionType: ActionType,
    target: ParticipantAccount,
    pointsToSpend: number,
    callbacks: ProgramMethodCallbacks
  ) => Promise<void>;
}) {
  const { tokens } = useUserNfts();
  const [pointsToSpend, setPointsToSpend] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [attack, setAttack] = useState<boolean>(false);

  const pointsLeft = spendableActionPoints(source, battleground);

  console.log(attack ? { attack } : { heal: true }, target, pointsToSpend, "points to spend");

  const handleConfirmAction = async () => {
    await action(attack ? { attack } : { heal: true }, target, pointsToSpend, {
      onSuccess: () => {
        toast.success(`Successfull ${attack ? "attack" : "healing"}`);
      },
      onError: (error) => {
        console.log(error, Object.entries(error));
        toast.error(error?.errorLogs || String(error));
      },
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`card bg-base-200 shadow-xl ${
        target.healthPoints === 0
          ? "border-red-500 border-4"
          : source.publicKey.equals(target.publicKey)
          ? "border-emerald-500 border-4"
          : tokens?.find((e) => e.key.equals(target.nftMint))
          ? "border-cyan-500 border-4"
          : ""
      }`}
    >
      <img src="" />
      <div className="card-body">
        <span className="card-title">{shortAddress(target.publicKey)}</span>
        <div className="flex flex-col text-start">
          <span className="text-xl font-bold">HP left: {target.healthPoints}</span>
          <span className="text-xl font-bold">Attack: {target.attack}</span>
          <span className="text-xl font-bold">Defense: {target.defense}</span>
        </div>
        <div className="card-actions">
          <button
            className="btn btn-danger"
            onClick={() => {
              setIsOpen(true);
              setAttack(true);
            }}
          >
            Attack
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsOpen(true);
              setAttack(false);
            }}
          >
            Heal
          </button>
        </div>
        {target.healthPoints === 0 ? (
          <span className="text-red-500">Dead</span>
        ) : source.publicKey.equals(target.publicKey) ? (
          <span className="text-emerald-500">This is you</span>
        ) : (
          tokens?.find((e) => e.key.equals(target.nftMint)) && (
            <span className="text-cyan-500">You own this participant</span>
          )
        )}
      </div>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box relative">
          <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>
            ✕
          </label>
          <h3 className="text-lg font-bold">{attack ? "Attack" : "Heal"} participant XXX</h3>
          <div className="flex flex-row gap-2">
            <span>0</span>
            <input
              type="range"
              min="0"
              max={pointsLeft}
              defaultValue="0"
              className="range"
              onChange={(e) => setPointsToSpend(Number(e.target.value))}
            />
            <span>{pointsLeft}</span>
          </div>
          <p className="py-4">
            You will{" "}
            {attack ? `deal ${source.attack * pointsToSpend} damage` : `heal ${(source.defense * pointsToSpend) / 2}`}
          </p>
          <button className="btn" onClick={() => handleConfirmAction()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
