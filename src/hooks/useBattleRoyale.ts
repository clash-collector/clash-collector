import {
  BATTLEGROUND_AUTHORITY_SEEDS,
  BATTLE_ROYALE_PROGRAM_ID,
  BattleRoyaleIdl,
  BattleRoyaleProgram,
} from "../programs/battleRoyale";
import { BN, IdlAccounts, Program } from "@project-serum/anchor";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BattlegroundAccount } from "./useBattleground";
import { Collection } from "../constants/collections";
import { PublicKey } from "@solana/web3.js";
import { formatBN } from "../utils";
import useProvider from "./useProvider";

export declare type BaseBattleRoyaleAccount = IdlAccounts<BattleRoyaleProgram>["battleRoyaleState"];
export interface BattleRoyaleAccount extends BaseBattleRoyaleAccount {
  publicKey: PublicKey;
}

export default function useBattleRoyale() {
  const provider = useProvider();
  const program = useMemo(() => {
    if (provider) {
      return new Program<BattleRoyaleProgram>(BattleRoyaleIdl, BATTLE_ROYALE_PROGRAM_ID, provider);
    }
  }, [provider]);
  const [gameMaster, setGameMaster] = useState<PublicKey>();
  const [battleRoyale, setBattleRoyale] = useState<BattleRoyaleAccount>();

  const fetchState = async () => {
    if (!program) return;

    const result = await program.account.battleRoyaleState.all();
    setGameMaster(result[0].account.gameMaster);
    setBattleRoyale({ ...result[0].account, publicKey: result[0].publicKey });
  };

  useEffect(() => {
    fetchState();
  }, [provider?.publicKey]);

  const fetchBattlegroundsByCollection = useCallback(
    async (collection: Collection): Promise<BattlegroundAccount[] | undefined> => {
      if (!program || !battleRoyale) return;

      const filters = collection.info.v2
        ? [{ memcmp: { offset: 20, bytes: collection.info.v2.collectionMint.toString() } }]
        : [{ memcmp: { offset: 20, bytes: collection.info.v1!.verifiedCreators.map((e) => e.toString()).join("") } }];

      // Add extra fields
      const accounts = (await Promise.all(
        (
          await program.account.battlegroundState.all()
        ).map(async (e) => {
          const mint = await getMint(program.provider.connection, e.account.potMint);
          let potValue: number;
          try {
            const [authorityAddress] = PublicKey.findProgramAddressSync(
              [BATTLEGROUND_AUTHORITY_SEEDS, e.account.id.toArrayLike(Buffer, "le", 8)],
              BATTLE_ROYALE_PROGRAM_ID
            );
            const tokenAccount = await getAccount(
              program.provider.connection,
              await getAssociatedTokenAddress(mint.address, authorityAddress, true)
            );
            potValue = new BN(tokenAccount.amount.toString()).toNumber() / new BN(10 ** mint.decimals).toNumber();
          } catch (err) {
            potValue = new BN(0).toNumber();
          }
          return {
            ...e.account,
            totalFee: e.account.creatorFee + battleRoyale.fee,
            publicKey: e.publicKey,
            potValue,
            ticketPrice: formatBN(e.account.entryFee, mint.decimals),
          };
        })
      )) as any;

      console.log(
        accounts.filter((e: any) => {
          if (e.collectionInfo.v2) {
            return e.collectionInfo.v2.collectionMint.toString() === collection.info.v2?.collectionMint.toString();
          } else if (e.collectionInfo.v1) {
            return e.collectionInfo.v1 === collection.info.v1;
          }
        }),
        accounts.map((e) => e.collectionInfo.v2.collectionMint.toString()),
        collection.info.v2?.collectionMint.toString()
      );

      // Return filtered accounts
      // TODO: Use fetch filters instead
      return accounts.filter((e: any) => {
        if (e.collectionInfo.v2) {
          return e.collectionInfo.v2.collectionMint.toString() === collection.info.v2?.collectionMint.toString();
        } else if (e.collectionInfo.v1) {
          return e.collectionInfo.v1 === collection.info.v1;
        }
      });
    },
    [program, battleRoyale]
  );

  const createBattleground = useCallback(
    async (
      collection: Collection,
      ticketToken: PublicKey,
      ticketCost: number,
      creator: PublicKey,
      creatorFee: number,
      participantsCap: number,
      pointsPerDay: number,
      holderWhitelistProof: number[][] | null = null
    ) => {
      if (!program) return;

      const mint = await getMint(program.provider.connection, ticketToken);

      const tx = await program.methods
        .createBattleground(
          collection.info as any,
          participantsCap,
          new BN(ticketCost * 10 ** (mint.decimals / 2)).mul(new BN(10 ** (mint.decimals / 2))),
          creator,
          creatorFee,
          pointsPerDay,
          holderWhitelistProof
        )
        .accounts({
          signer: program.provider.publicKey,
          battleRoyale: battleRoyale?.publicKey,
          potMint: ticketToken,
        })
        .rpc();
      await program.provider.connection.confirmTransaction(tx);
    },
    [program, battleRoyale]
  );

  return { gameMaster, battleRoyale, fetchBattlegroundsByCollection, createBattleground };
}
