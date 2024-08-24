import ConnectWallet from "../components/ConnectWallet";
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const getLibrary = (provider: any) => new Web3Provider(provider);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectWallet {...pageProps} />
    </Web3ReactProvider>
  );
};

export default MyApp;
