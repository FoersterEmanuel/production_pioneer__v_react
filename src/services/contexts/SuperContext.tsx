import { ItemsProvider } from "./ItemsContext";
import { LanguageProvider } from "./LanguageContext";
import { TimerProvider } from "./TimerContext";
import { WalletProvider } from "./WalletContext";

interface SuperProviderProps {
  children: React.ReactNode;
}

const SuperProvider = ({ children }: SuperProviderProps) => {
  return (
    <LanguageProvider>
      <TimerProvider>
        <WalletProvider>
          <ItemsProvider>
            {children}
          </ItemsProvider>
        </WalletProvider>
      </TimerProvider>
    </LanguageProvider>
  );
};

export default SuperProvider;