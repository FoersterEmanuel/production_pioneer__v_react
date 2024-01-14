import { useItemsContext } from '../../services/contexts/ItemsContext';
import { useTimerContext } from '../../services/contexts/TimerContext';
import { useWalletContext } from '../../services/contexts/WalletContext';

import Frame from '../../components/generic/Frame';
import LoadingBar from '../../components/LoadingBar';
import Button from '../../components/Button';

import Images from '../../assets/images/Images';

import './header.css';

const Header = () => {

  const { start: timerStart, reset:timerReset, isTimerRunning, roundNormalized, roundStepNormalized } = useTimerContext();
  const {reset: itemsReset} = useItemsContext();
  const { coins, start: walletStart } = useWalletContext();

  const Logo = <img src={Images.logo} alt="logo" className="header_logo" />;

  const startEvent = () => {
    timerStart();
    walletStart();
  };
  const resetEvent = () => {
    timerReset();
    itemsReset();
    walletStart();
  };

  return (
    <Frame flat fullwidth>

      <div className="header_container">
        {Logo}
        <div className="header_main">
          <div className="header_main_info">
            <LoadingBar value={roundNormalized} /><br />
            <LoadingBar value={roundStepNormalized} />
            Coins: {coins}
          </div>
          <div className="header_main_button">
            {(!isTimerRunning) ? (
              <Button onClick={startEvent}>
                Start
              </Button>
            ) : (
              <Button onClick={resetEvent}>
                Reset
              </Button>
            )}
          </div>
        </div>
        {Logo}
      </div>
    </Frame>
  );
};

export default Header;