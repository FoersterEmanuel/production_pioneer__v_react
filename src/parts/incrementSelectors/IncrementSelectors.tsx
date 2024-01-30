import configData from '../../data/config';

import { useWalletContext } from '../../services/contexts/WalletContext';
import { useLanguageContext } from '../../services/contexts/LanguageContext';

import Button from '../../components/Button';
import PopupButton from '../../components/PopupButton';

import './incrementSelectors.css';

const IncrementSelectors = () => {

  const { incrementValue, setIncrementValue } = useWalletContext();
  const { getWord } = useLanguageContext();
  const values = configData.incrementValues;

  return (
    <div className="incrementSelectors">
      {values.map((val, key) => {
        return (<Button key={key} onClick={() => { setIncrementValue(val) }} smallH disabled={incrementValue === val}>{val}</Button>);
      })}
      <PopupButton title="?" right>
        {getWord("popup_2")}
      </PopupButton>
    </div>
  );
};

export default IncrementSelectors;