import React, { useEffect, useMemo, useState } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import useProvider from "../hooks/useProvider";
import { Program } from "@project-serum/anchor";
import { BattleRoyaleIdl, BattleRoyaleProgram, BATTLE_ROYALE_PROGRAM_ID } from "../programs/battleRoyale";
import { ParticipantAccount } from "../hooks/useBattleground";
import { PublicKey } from "@solana/web3.js";

export interface NftAccount {
  key: anchor.web3.PublicKey;
  metadata: anchor.web3.PublicKey;
  name: string;
  symbol: string;
  uri: string;
}

interface UserNftsContextProps {
  tokens?: NftAccount[];
  userParticipants?: ParticipantAccount[];
}
export const UserNftsContext = React.createContext<UserNftsContextProps>({
  tokens: [],
});

export const UserNftsProvider = ({ children }: { children: React.ReactNode }) => {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const [tokens, setTokens] = useState<NftAccount[]>();
  const [userParticipants, setUserParticipants] = useState<ParticipantAccount[]>();

  const fetchNfts = async () => {
    if (!provider) return;
    const accounts = await new Metaplex(provider.connection).nfts().findAllByOwner(provider.publicKey).run();
    console.log(accounts);
    setTokens(
      accounts.map((e) => ({ key: e.mintAddress, metadata: e.address, name: e.name, symbol: e.symbol, uri: e.uri }))
    );
  };

  useEffect(() => {
    if (!tokens) {
      fetchNfts();
    }
  }, [provider]);

  const fetchUserParticipants = async () => {
    if (!program || !tokens) return;

    const result: any[] = [];
    for (const t of tokens) {
      result.push(await program.account.participantState.all([{ memcmp: { offset: 41, bytes: t.key.toString() } }]));
    }
    setUserParticipants(
      result
        .flat()
        .filter(Boolean)
        .map((e) => ({ ...e.account, publicKey: e.publicKey }))
    );
  };

  useEffect(() => {
    if (!userParticipants) {
      fetchUserParticipants();
    }
  }, [tokens, userParticipants]);

  return <UserNftsContext.Provider value={{ tokens, userParticipants }}>{children}</UserNftsContext.Provider>;
};
