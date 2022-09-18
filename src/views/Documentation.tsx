import { APP_NAME } from "../constants";
import Hero from "../components/Hero";
import React from "react";
import View from "../components/View";
import logo from "../assets/logo.svg";

const questions = [
  {
    question: `What is ${APP_NAME}?`,
    answer: (
      <div>
        {APP_NAME} is platform that let's NFT collections create battlegrounds on which collection's token can fight to
        win the pot.
      </div>
    ),
  },
  {
    question: `How do battlegrounds work?`,
    answer: (
      <div>
        Battlegrounds have a fixed limit of participants. Once the battleground is full of participants, anybody can
        start the battleground. From this point, participants earn <i>action points</i> they can use to make their way
        to victory.
      </div>
    ),
  },
  {
    question: `How to join a battleground?`,
    answer: (
      <span>
        To join a battleground you must have a NFT of the associated NFT collection and pay the battleground's entry
        fee. Most of the fee goes to the battleground's pot, a small part is used to fund {APP_NAME}'s developments.
        <br />
        When joining the battleground, you can choose characteristics of your participant. The characteristics can only
        be changed when your participant is killed.
      </span>
    ),
  },
  {
    question: `How to play once the battle starts?`,
    answer: (
      <span>
        Active participants earn action points over time that they can use to attack or heal another participant. Team
        up with other players to increase your chance of winning.
      </span>
    ),
  },
  {
    question: `What happens when the battle is over?`,
    answer: (
      <span>
        Once there is only one participant left standing, anyone can finish the battle. This will automatically send to
        reward to the owner of the NFT associated to the winning participant. Other participants can start joining
        again, and dead ones can leave the battleground to retrieve the rents of their accounts. The last winner stays
        on the battleground until it dies, giving it a chance to win another round for free.
      </span>
    ),
  },
  {
    question: `Who can create a battleground?`,
    answer: (
      <span>
        Anyone can create a battleground, altough only verified only will be visible by default on the official
        frontend. During the creation, the token used to pay the entry, the price (denominated in the token), the number
        of participants and the speed of the battle can be set.
      </span>
    ),
  },
];

export default function Documentation() {
  const Question = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
    return (
      <div className="card shadow-xl bg-primary text-primary-content p-2">
        <div className="card-title">{question}</div>
        <div className="card-body p-1">{answer}</div>
      </div>
    );
  };
  return (
    <View>
      <Hero
        image={<img src={logo} className="logo w-32 h-32 mx-auto" alt={APP_NAME} />}
        title="Clash Collector's Documentation"
      />
      <div className="mt-10">
        <div className="my-5 justify-center">
          <span className="text-3xl">Links</span>
          <hr />
          <div className="flex flex-col p-3 justify-center">
            <ul className="mx-auto flex flex-col gap-3">
              <li className="mx-auto">
                <a className="btn" href="https://discord.gg/tBYdxGHrRA">
                  Discord server
                </a>
              </li>
              <li className="mx-auto">
                <a className="btn" href="https://github.com/clash-collector">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span className="text-3xl">FAQ</span>
          <hr />
          <div className="grid grid-cols-3 grid-rows-2 gap-2 p-2">
            {questions.map((e) => (
              <Question {...e} />
            ))}
          </div>
        </div>
      </div>
    </View>
  );
}
