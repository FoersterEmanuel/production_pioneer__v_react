import { ItemsProvider } from "./ItemsContext";
import { TimerProvider } from "./TimerContext";
import { WalletProvider } from "./WalletContext";

interface SuperProviderProps {
  children: React.ReactNode;
}

const SuperProvider = ({ children }: SuperProviderProps) => {
  return (
    <TimerProvider>
      <WalletProvider>
        <ItemsProvider>
        {children}
        </ItemsProvider>
      </WalletProvider>
    </TimerProvider>
  );
};

export default SuperProvider;