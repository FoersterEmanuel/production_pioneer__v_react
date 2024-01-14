import { TimerProvider } from "./TimerContext";
import { WalletProvider } from "./WalletContext";

interface SuperProviderProps {
  children: React.ReactNode;
}

const SuperProvider = ({ children }: SuperProviderProps) => {
  return (
    <TimerProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </TimerProvider>
  );
};

export default SuperProvider;