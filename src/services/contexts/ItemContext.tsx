import { createContext, useContext } from "react";

const TimerContext = createContext({});

interface TimerProps {
  children: React.ReactNode;
}

export const Timer = ({ children }:TimerProps) => {
  return (
    <TimerContext.Provider value={{}}>
      {children}
    </TimerContext.Provider>
  );
};
export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('timerContext error');
  }
  return context;
};