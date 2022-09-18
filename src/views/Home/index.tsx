import { APP_NAME } from "../../constants";
import Hero from "../../components/Hero";
import { Link } from "react-router-dom";
import React from "react";
import View from "../../components/View";
import logo from "../../assets/logo.svg";
import useCollections from "../../hooks/useCollections";

export default function Home() {
  return (
    <View>
      <Hero
        image={<img src={logo} className="logo w-32 h-32 mx-auto" alt={APP_NAME} />}
        content={
          <>
            <span className="text-4xl font-bold text-center">{APP_NAME}</span>
            <span className="text-xl font-bold">Solana's on-chain Battle Royale</span>
            <span className="text-lg">Invite NFT holders of a collection to a deathmatch.</span>
            <span className="text-md">Pay a ticket to participate, winner takes all.</span>
          </>
        }
      />
      <div className="mt-10 flex flex-col justify-center align-center">
        <div className="flex justify-center text-2xl">How to play?</div>
        <div className="flex">
          <ul className="steps steps-vertical mx-auto justify-center">
            <Link to="/collections">
              <li className="step">Browse collections</li>
            </Link>
            <li className="step">Select the one for which you have a token</li>
            <li className="step">Join a battleground with a ticket price that fits your criteria.</li>
            <li className="step">Once full, be the last participant standing in the battleground</li>
            <li className="step">The pot created from ticket sales goes to the winner</li>
          </ul>
        </div>
        <Link to={"/collections"} className="mx-auto">
          <div className="btn btn-lg btn-primary">START</div>
        </Link>
      </div>
    </View>
  );
}
