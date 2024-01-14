import configData from '../../data/config';

import { useWalletContext } from '../../services/contexts/WalletContext';

import Button from '../../components/Button';

import './incrementSelectors.css';

const IncrementSelectors = () => {

  const { incrementValue, setIncrementValue } = useWalletContext();
  const values = configData.incrementValues;

  return (
    <div className="incrementSelectors">
      {values.map((val, key) => {
        return (<Button key={key} onClick={() => { setIncrementValue(val) }} smallH disabled={incrementValue === val}>{val}</Button>);
      })}
    </div>
  );
};

export default IncrementSelectors;