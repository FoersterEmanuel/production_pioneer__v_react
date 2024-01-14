
import { useTimerContext } from '../../services/contexts/TimerContext';

import ScrollBox from '../../components/generic/ScrollBox';

import './main.css';

const Main = () => {

  const { isTimerRunning, round } = useTimerContext();

  return (
    <ScrollBox>
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      Main <br />
      {round}
      {isTimerRunning ? "on" : "off"}
    </ScrollBox>
  );
};

export default Main;