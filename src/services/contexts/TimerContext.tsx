import { createContext, useContext, useEffect, useState } from "react";

import TimerClass from "../classes/TimerClass";
import configData from "../../data/config";

type TimerContextProps = {
  start: () => void;
  reset: () => void;
  isTimerRunning: boolean;
  round: number;
  roundNormalized: number;
  roundStepNormalized: number;
};
const timerContextInit: TimerContextProps = {
  start: () => { },
  reset: () => { },
  isTimerRunning: false,
  round: 0,
  roundNormalized: 0,
  roundStepNormalized: 0,
}
const TimerContext = createContext<TimerContextProps>(timerContextInit);


interface TimerProps {
  children: React.ReactNode;
};

export const TimerProvider = ({ children }: TimerProps) => {

  const [update, setUpdate] = useState(0);
  
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [roundNormalized, setRoundNormalized] = useState(0);
  const [roundStepNormalized, setRoundStepNormalized] = useState(0);

  const maxTime = configData.steps * configData.timePerStep

  const [timer] = useState<TimerClass>(new TimerClass(maxTime, () => { setUpdate(Math.random()) }));

  const restTime = () => maxTime - timer.getRemainingTime();
  const calcRound = () => Math.ceil(restTime() / configData.timePerStep);
  const calcRoundStep = () => restTime() % configData.timePerStep;
  const calcRoundNormalized = () => calcRound() / configData.steps;
  const calcRoundStepNormalized = () => calcRoundStep() / configData.timePerStep

  useEffect(() => {
    setIsTimerRunning(timer.isTimerRunning);
    setRound(calcRound());
    setRoundNormalized(calcRoundNormalized());
    setRoundStepNormalized(calcRoundStepNormalized());
    // eslint-disable-next-line
  }, [update]);

  return (
    <TimerContext.Provider value={{
      start: timer.start,
      reset: timer.reset,
      isTimerRunning,
      round,
      roundNormalized,
      roundStepNormalized
    }}>
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