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
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useMemo } from "react";

import Battleground from "./views/Battleground";
import Collection from "./views/Collection";
import Collections from "./views/Collections";
import Documentation from "./views/Documentation";
import Home from "./views/Home";
import Participant from "./views/Participant";
import Settings from "./views/Settings";
import { Toaster } from "react-hot-toast";
import { TokensProvider } from "./contexts/Tokens";
import { UserNftsProvider } from "./contexts/UserNfts";
import UserParticipants from "./views/UserParticipants";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import useNetwork from "./hooks/useNetwork";

const Router = () => {
  return (
    <HashRouter>
      <Providers>
        <Toaster toastOptions={{ className: "", duration: 8000 }} />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collection">
              <Route path=":collectionQueryString" element={<Collection />} />
            </Route>
            <Route path="battleground">
              <Route path=":battlegroundId" element={<Battleground />} />
            </Route>
            <Route path="participant">
              <Route path=":participantId" element={<Participant />} />
            </Route>
            <Route path="/nfts" element={<UserParticipants />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Providers>
    </HashRouter>
  );
};

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { endpoint } = useNetwork();

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
