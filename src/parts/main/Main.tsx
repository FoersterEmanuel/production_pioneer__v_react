import { useItemsContext } from '../../services/contexts/ItemsContext';

import ScrollBox from '../../components/generic/ScrollBox';

import ItemBox from './itemBox/ItemBox';

import './main.css';

const Main = () => {

  const { getAllItems } = useItemsContext();

  return (
    <ScrollBox>
      <div className="main_container">
        {
          getAllItems().map((item, key) => {
            return (<ItemBox key={key} id={item.getId()} />);
          })
        }
      </div>
    </ScrollBox>
  );
};

export default Main;