import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TokenaryWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Collection from "./views/Collection";
import Battleground from "./views/Battleground";
import Home from "./views/Home";
import Participant from "./views/Participant";

import "@solana/wallet-adapter-react-ui/styles.css";
import NftsView from "./views/NFTs";
import { UserNftsProvider } from "./contexts/UserNfts";
import { IS_MAINNET } from "./constants";
import { Toaster } from "react-hot-toast";
import { TokensProvider } from "./contexts/Tokens";

const Router = () => {
  return (
    <HashRouter>
      <Providers>
        <Navbar />
        <Toaster toastOptions={{ className: "", duration: 8000 }} />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="collection">
              <Route path=":collectionId" element={<Collection />} />
            </Route>
            <Route path="battleground">
              <Route path=":battlegroundId" element={<Battleground />} />
            </Route>
            <Route path="participant">
              <Route path=":participantId" element={<Participant />} />
            </Route>
            <Route path="/nfts" element={<NftsView />} />
          </Route>
        </Routes>
      </Providers>
    </HashRouter>
  );
};

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = IS_MAINNET ? "https://ssc-dao.genesysgo.net" : "http://localhost:8899";

  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new GlowWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new TokenaryWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <TokensProvider>
            <UserNftsProvider>{children}</UserNftsProvider>
          </TokensProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default function App() {
  return <Router />;
}
