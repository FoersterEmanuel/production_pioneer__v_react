import { createContext, useContext, useEffect, useState } from "react";

import WalletClass from "../classes/WalletClass";

type WalletContextProps = {
  start: () => void;
  setIncrementValue: (val: number) => void;
  addCoins: (val:number)=>boolean;
  coins: number;
  incrementValue: number;
};
const walletContextInit: WalletContextProps = {
  start: () => { },
  setIncrementValue: ()=>{},
  addCoins: (val)=>false,
  coins: 0,
  incrementValue: 0,
}
const WalletContext = createContext(walletContextInit);

interface WalletProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: WalletProps) => {

  const [update, setUpdate] = useState(0);

  const [coins, setCoins] = useState(0);
  const [incrementValue, setIncrementVal] = useState(0);

  const [wallet] = useState<WalletClass>(new WalletClass(() => { setUpdate(Math.random()) }));

  useEffect(() => {
    setCoins(wallet.getCoins());
    setIncrementVal(wallet.getIncrementValue());
    // eslint-disable-next-line
  }, [update]);

  return (
    <WalletContext.Provider value={{
      start: wallet.reset,
      setIncrementValue: wallet.setIncrementValue,
      addCoins: wallet.addCoins,
      coins,
      incrementValue
    }}>
      {children}
    </WalletContext.Provider>
  );
};
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('walletContext error');
  }
  return context;
};