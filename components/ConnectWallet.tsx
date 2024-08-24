import { useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

// Create an instance of the InjectedConnector
const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // Ethereum mainnet and testnets
});

const ConnectWallet: React.FC = () => {
  const { activate, account, library, deactivate } = useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (library && account) {
      (async () => {
        try {
          const balance = await library.getBalance(account);
          setBalance(ethers.formatEther(balance.toString())); // Format balance to ETH
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      })();
    }
  }, [library, account]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Connect to MetaMask</h1>
      <button
        onClick={() => activate(injected)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Connect Wallet
      </button>
      {account && (
        <div style={{ marginTop: '20px' }}>
          <h2>Connected Account: {account}</h2>
          <h3>Balance: {balance !== null ? `${balance} ETH` : 'Loading...'}</h3>
          <button
            onClick={() => deactivate()}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
