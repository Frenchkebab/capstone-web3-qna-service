import React from 'react';
import { useState, useEffect } from 'react';
import { getProvider, getSignerAddress } from '../provider';

const WalletContext = React.createContext({});

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState();

  useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      setProvider(_provider);
      console.log(_provider);
      const _walletAddress = await getSignerAddress();
      if (_walletAddress) {
        setWalletAddress(_walletAddress);
      }
    }

    init();
  }, []);

  if (provider) {
    provider.on('accountChanged', (address) => {
      console.log(address);
    });
  }
  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => React.useContext(WalletContext);
