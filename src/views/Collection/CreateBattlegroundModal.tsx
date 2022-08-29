import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import TokenIcon from "../../components/TokenIcon";
import { Collection } from "../../constants/collections";
import useBattleRoyale from "../../hooks/useBattleRoyale";
import useProvider from "../../hooks/useProvider";
import useTokens from "../../hooks/useTokens";
import { BATTLE_ROYALE_PROGRAM_ID } from "../../programs/battleRoyale";
import { shortAddress } from "../../utils";

interface CreateBattlegroundModalProps {
  collection: Collection;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBattlegroundModal({ collection, isOpen, onClose }: CreateBattlegroundModalProps) {
  const provider = useProvider();
  const { createBattleground } = useBattleRoyale();
  const { names } = useTokens();

  const [query, setQuery] = useState<string>("");
  const [ticketToken, setTicketToken] = useState<string>();
  const [ticketCost, setTicketCost] = useState<number>();
  const [participantsCap, setParticipantsCap] = useState<number>();
  const [pointsPerDay, setPointsPerDay] = useState<number>();

  console.log(ticketToken, document.activeElement, document.getElementById("token-input"));

  const filteredTokenNames = names
    ? query === ""
      ? [...names?.keys()]
      : [...names?.keys()].filter((name) => {
          return name.toLowerCase().includes(query.toLowerCase());
        })
    : [];

  const handleCreateBattleground = async () => {
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
    <div className={`modal cursor-pointer ${isOpen ? "modal-open" : ""}`}>
      <label className="modal-box relative">
        <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>
          ✕
        </label>
        <h3 className="text-xl font-bold">Create a battleground for {collection.name}</h3>
        <hr />
        <div className="flex flex-col w-full gap-2 my-2">
          <div className="flex flex-col w-100 justify-start" tabIndex={0}>
            <div className="w-full font-bold">Input token</div>
            {ticketToken && (
              <div className="flex flex-row align-middle pb-2 gap-2">
                <div className="my-auto">Currently selected:</div> <TokenIcon mint={ticketToken} explorer />
              </div>
            )}
            <input
              id="token-input"
              type="text"
              autoComplete="off"
              placeholder={shortAddress(BATTLE_ROYALE_PROGRAM_ID)}
              className="input input-bordered"
              onChange={(e) => {
                try {
                  const addr = new PublicKey(e.target.value);
                  setTicketToken(addr.toString());
                } catch (e) {
                  setQuery(e.target.value);
                }
              }}
            />
            {names && query !== "" && (
              <ul className="menu mt-2 p-2 shadow bg-base-100 rounded-box w-full">
                {filteredTokenNames.slice(0, 5).map((name) => (
                  <li
                    onClick={() => {
                      setTicketToken(names.get(name)!);
                      setQuery("");
                    }}
                  >
                    <TokenIcon mint={names.get(name)!} />
                  </li>
                ))}
              </ul>
            )}
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
          {pointsPerDay && participantsCap && (
            <div>
              It will take approximately between {(1250 / 150 / pointsPerDay).toFixed(1)} days and{" "}
              {((1250 / 150 / pointsPerDay) * participantsCap).toFixed(1)} to finish the battleground
            </div>
          )}
          <div>
            <button className="btn btn-primary w-full" onClick={() => handleCreateBattleground()}>
              Create
            </button>
          </div>
        </div>
      </label>
    </div>
  );
}
