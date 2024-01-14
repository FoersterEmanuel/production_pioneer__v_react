import { useItemsContext } from "../../../services/contexts/ItemsContext";
import { useTimerContext } from "../../../services/contexts/TimerContext";

import Frame from "../../../components/generic/Frame";

import "./itemBox.css";
import Button from "../../../components/Button";
import { useWalletContext } from "../../../services/contexts/WalletContext";
import { useEffect, useState } from "react";
import configData from "../../../data/config";

const ItemBox = ({ id }: { id: number }) => {

  const { getItemById } = useItemsContext();
  const { isTimerRunning, round } = useTimerContext();
  const { incrementValue } = useWalletContext();

  const [update, setUpdate] = useState(0);
  const [quantityOwned, setQuantityOwned] = useState(0);

  const Item = getItemById(id);
  const chartValues = Item?.getChartValues();

  const doUpdate = () => {
    setUpdate(Math.random());
  }

  const changeQuantity = (val: number) => {
    if (Item !== null) {
      if (Item.addQuantityOwned(val)) doUpdate();
    }
  };
  const buyQuantity = (val: number) => {
    changeQuantity(val);
  }
  const addQuantity = () => { buyQuantity(incrementValue) };
  const subQuantity = () => { buyQuantity(incrementValue * -1) };

  useEffect(() => {
    if (Item !== null) {
      setQuantityOwned(Item.getQuantityOwned());

    }
  }, [update])

  return (
    <Frame flat>
      <article>
        <div className="item_header">
          <div className="item_info">
            <div className="item_name">{Item!.getName()}</div>
            <div className="item_quantity">
              <div>{quantityOwned}</div>
              <div>{chartValues![(isTimerRunning)?round:chartValues!.length-1]}</div>
              <div className="item_quantityButton">
                <Button onClick={subQuantity} small>- {incrementValue}</Button>
                <Button onClick={addQuantity} small>+ {incrementValue}</Button>
              </div>
            </div>
          </div>
          <img className="item_image" src={Item!.getImage()} />
        </div>
        <div className="item_chart">
          {/* {chartValues} */}
        </div>
        <div className="item_worker"></div>


        {/* {round}
        {isTimerRunning ? "on" : "off"} */}
      </article>
    </Frame>
  );
};

export default ItemBox;