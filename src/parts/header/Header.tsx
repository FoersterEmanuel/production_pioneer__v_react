import { useItemsContext } from '../../services/contexts/ItemsContext';
import { useTimerContext } from '../../services/contexts/TimerContext';
import { useWalletContext } from '../../services/contexts/WalletContext';

import { useLanguageContext } from '../../services/contexts/LanguageContext';
import { LanguageSet, languageSet } from '../../services/classes/LanguageClass';

import Frame from '../../components/generic/Frame';
import LoadingBar from '../../components/LoadingBar';
import Button from '../../components/Button';

import Images from '../../assets/images/Images';

import './header.css';

const Header = () => {

  const { start: timerStart, reset: timerReset, isTimerRunning, roundNormalized, roundStepNormalized } = useTimerContext();
  const { reset: itemsReset } = useItemsContext();
  const { coins, start: walletStart } = useWalletContext();
  const { getWord, changeLanguage, language } = useLanguageContext();

  const supportedLanguages: LanguageSet[] = languageSet;

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
            GameTimer: <LoadingBar value={roundNormalized} /><br />
            RoundTimer: <LoadingBar value={roundStepNormalized} />
            {getWord("coins")}: {coins}
          </div>
          <div className="header_main_button">
            {
              supportedLanguages.map((currentLanguage) => (
                <Button key={currentLanguage} onClick={() => { changeLanguage(currentLanguage) }} disabled={currentLanguage === language } small>
                  {currentLanguage}
                </Button>
              ))
            }
            {(!isTimerRunning) ? (
              <Button onClick={startEvent}>
                {getWord("start")}
              </Button>
            ) : (
              <Button onClick={resetEvent}>
                {getWord("reset")}
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