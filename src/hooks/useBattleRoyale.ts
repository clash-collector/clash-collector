import { BN, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Collection } from "../constants/collections";
import { BattleRoyaleProgram, BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID } from "../programs/battleRoyale";
import { BattlegroundAccount } from "./useBattleground";
import useProvider from "./useProvider";

export default function useBattleRoyale() {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const [gameMaster, setGameMaster] = useState<PublicKey>();
  const [battleRoyale, setBattleRoyale] = useState<PublicKey>();

  const fetchState = async () => {
    if (!program) return;

    const result = await program.account.battleRoyaleState.all();
    setGameMaster(result[0].account.gameMaster);
    setBattleRoyale(result[0].publicKey);
  };

  useEffect(() => {
    if (!gameMaster) {
      fetchState();
    }
  }, [gameMaster]);

  const fetchBattlegroundsByCollection = useCallback(
    async (collection: Collection): Promise<BattlegroundAccount[] | undefined> => {
      if (!program) return;

      const filters = collection.info.v2
        ? [{ memcmp: { offset: 20, bytes: collection.info.v2.collectionMint.toString() } }]
        : [{ memcmp: { offset: 20, bytes: collection.info.v1!.verifiedCreators.map((e) => e.toString()).join("") } }];

      // Add extra fields
      const accounts = (await Promise.all(
        (
          await program.account.battlegroundState.all()
        ).map((e) => ({ ...e.account, publicKey: e.publicKey, potValue: 10 }))
      )) as any;

      // Return filtered accounts
      // TODO: Use fetch filters instead
      return accounts.filter((e: any) => {
        console.log(e);
        if (e.collectionInfo.v2) {
          console.log(
            "v2",
            e.collectionInfo.v2.collectionMint.toString(),
            collection.info.v2?.collectionMint.toString()
          );
          return e.collectionInfo.v2.collectionMint.toString() === collection.info.v2?.collectionMint.toString();
        } else if (e.collectionInfo.v1) {
          return e.collectionInfo.v1 === collection.info.v1;
        }
      });
    },
    [program]
  );

  const createBattleground = useCallback(
    async (
      collection: Collection,
      ticketToken: PublicKey,
      ticketCost: number,
      participantsCap: number,
      pointsPerDay: number
    ) => {
      if (!program) return;

      const tx = await program.methods
        .createBattleground(collection.info as any, participantsCap, new BN(ticketCost), pointsPerDay)
        .accounts({
          signer: program.provider.publicKey,
          battleRoyaleState: battleRoyale,
          potMint: ticketToken,
        })
        .rpc();
      await program.provider.connection.confirmTransaction(tx);
    },
    [program, battleRoyale]
  );

  return { gameMaster, battleRoyale, fetchBattlegroundsByCollection, createBattleground };
}
