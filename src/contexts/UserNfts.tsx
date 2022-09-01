import React, { useEffect, useMemo, useState } from "react";
import { FindNftsByOwnerOutput, Metadata, Metaplex } from "@metaplex-foundation/js";
import useProvider from "../hooks/useProvider";
import { Program } from "@project-serum/anchor";
import { BattleRoyaleIdl, BattleRoyaleProgram, BATTLE_ROYALE_PROGRAM_ID } from "../programs/battleRoyale";
import { ParticipantAccount } from "../hooks/useBattleground";

interface UserNftsContextProps {
  tokens?: Metadata[];
  userParticipants?: ParticipantAccount[];
  fetchUserParticipants: () => Promise<void>;
}
export const UserNftsContext = React.createContext<UserNftsContextProps>({
  tokens: [],
  fetchUserParticipants: () => new Promise(() => {}),
});

export const UserNftsProvider = ({ children }: { children: React.ReactNode }) => {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const [tokens, setTokens] = useState<Metadata[]>();
  const [userParticipants, setUserParticipants] = useState<ParticipantAccount[]>();

  const fetchNfts = async () => {
    if (!provider) return;
    try {
      const accounts: FindNftsByOwnerOutput = await new Metaplex(provider.connection)
        .nfts()
        .findAllByOwner(provider.publicKey)
        .run();
      const metadatas = accounts.filter((e) => e.model === "metadata") as Metadata[];
      console.log(metadatas);
      setTokens(metadatas);
    } catch (err) {
      console.log("Failed to fetch user NFTs:", err);
    }
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
      result.push(
        await program.account.participantState.all([{ memcmp: { offset: 41, bytes: t.mintAddress.toString() } }])
      );
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

  return (
    <UserNftsContext.Provider value={{ tokens, userParticipants, fetchUserParticipants }}>
      {children}
    </UserNftsContext.Provider>
  );
};
