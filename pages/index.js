import React from "react";
import HeadComponent from '../components/Head';
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Constants
const TWITTER_HANDLE = "Jarrett";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  //Dynamic import `WalletMultiButton` to prevent hydration error
  const WalletMultiButtonDynamic = dynamic(
    async () => 
     ( await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false}
  );

  //This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://i.giphy.com/media/39tzv6VVmqdXstQumX/200w.webp" alt="emoji" />

      <div className="button-container">
        <WalletMultiButtonDynamic className="cta-button conncet-wallet-button" />
      </div>
    </div>
  );
  
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> 😳 NFT Store 😈</p>
          <p className="sub-text">The only NFT store that accepts sh*tcoins</p>
        </header>

        <main>
          {/* We only render the connect button if public key doesn't exist */}
          {publicKey ? "Connected!" : renderNotConnectedContainer()}
          
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
