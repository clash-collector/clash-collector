import { APP_NAME } from "../constants";
import React from "react";
import View from "../components/View";
import logo from "../assets/logo.svg";
import useUserNfts from "../hooks/useUserNfts";

export default function NftsView() {
  const { tokens } = useUserNfts();
  return (
    <View>
      <div className="flex flex-col align-center text-center p-5 bg-gray-100 rounded-2xl max-w-4xl mx-auto">
        <img src={logo} className="logo w-32 h-32 mx-auto" alt={APP_NAME} />
        <span className="text-6xl font-bold text-center">{APP_NAME}</span>
        <span className="text-3xl font-bold">Solana's on-chain Battle Royale</span>
        <span className="text-xl">Invite NFT holders of a collection to a deathmatch.</span>
        <span className="text-xl">Pay a ticket to participate, winner takes all.</span>
      </div>
      <div className="mt-10">
        <span className="text-3xl">Your NFTs</span>
        <hr />
        <div className="flex flex-row flex-wrap">
          {tokens ? (
            tokens.length > 0 ? (
              tokens.map((e) => (
                <div
                  key={e.mintAddress.toString()}
                  className="card w-96 border-2 border-base-200 bg-base-100 shadow-xl m-3"
                >
                  <span className="justify-center m-auto p-4">Image should be here</span>
                  <div className="card-body">
                    <span className="text-xl font-bold m-auto">{e.name}</span>
                    <span className="text-base-300">${e.symbol}</span>
                    <button className="btn btn-primary">See battlegrounds for this token</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-3xl">You have no tokens</div>
            )
          ) : (
            <div className="progress"></div>
          )}
        </div>
      </div>
    </View>
  );
}
