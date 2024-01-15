import { useEffect, useState } from "react";

import { useItemsContext } from "../../../services/contexts/ItemsContext";
import { useTimerContext } from "../../../services/contexts/TimerContext";
import { useWalletContext } from "../../../services/contexts/WalletContext";

import Frame from "../../../components/generic/Frame";
import Button from "../../../components/Button";

import Chart from "./Chart";

import Images from "../../../assets/images/Images";

import "./itemBox.css";


const ItemBox = ({ id }: { id: number }) => {
  // global states
  const { getItemById } = useItemsContext();
  const { isTimerRunning, round } = useTimerContext();
  const { coins, addCoins, incrementValue } = useWalletContext();
  // local states
  const [update, setUpdate] = useState(0);
  const [quantityOwned, setQuantityOwned] = useState(0);
  const [worker, setWoker] = useState(0);
  const [canBuy, setCanBuy] = useState(true);
  // local vars
  const item = getItemById(id);
  const chartValues = item?.getChartValues();
  const parents = [];

  const doUpdate = () => {
    setUpdate(Math.random());
  }

  // item quantity
  const changeQuantity = (val: number) => {
    if (item !== null) {
      if (item.addQuantityOwned(val)) doUpdate();
    }
  };
  const buyQuantity = (val: number) => {
    console.log(val * chartValues![round] * -1)
    if (addCoins(val * chartValues![round] * -1)) {
      changeQuantity(val);
    }
  }
  const addQuantity = () => { buyQuantity(incrementValue) };
  const subQuantity = () => { buyQuantity(incrementValue * -1) };

  // worker quantity
  const changeWorker = (val: number) => {
    if (item !== null) {
      if (item.addWorker(val)) doUpdate();
    }
  };
  const addWorker = () => { changeWorker(incrementValue) };
  const subWorker = () => { changeWorker(incrementValue * -1) };

  useEffect(() => {
    if (item !== null) {
      setQuantityOwned(item.getQuantityOwned());
      setWoker(item.getWorker())
      setCanBuy(incrementValue * chartValues![round] <= coins)
    }
    // eslint-disable-next-line
  }, [update, round])

  return (
    <Frame flat>
      <article>
        <div className="item_header">
          <div className="item_info">
            <div className="item_name">{item!.getName()}</div>
            <div className="item_quantity">
              <div>owned: {quantityOwned}</div>
              <div>{chartValues![(isTimerRunning) ? round : chartValues!.length - 1]} coins</div>
              <div className="item_quantityButton">
                <Button onClick={subQuantity} small disabled={(incrementValue > quantityOwned) || !isTimerRunning}>- {incrementValue}</Button>
                <Button onClick={addQuantity} disabled={!canBuy || !isTimerRunning} small>+ {incrementValue}</Button>
              </div>
            </div>
          </div>
          <img className="item_image" src={item!.getImage()} alt={item!.getImage()} />
        </div>
        <div className="item_chart">
          <Chart chartValues={chartValues!} round={(isTimerRunning) ? round : chartValues!.length - 1} />
        </div>
        <section className="item_production">
          <img src={Images.wood_worker} className="item_workerImage" alt="worker" />
          <div className="item_worker">
            <div className="item_workerQuantity">
              worker: {worker}
            </div>
            <div className="item_workerCost">
              cost/per: {item!.getWorkerCost()}<br/>
              cost: {worker * item!.getWorkerCost()}
            </div>
            <div className="item_workerQuantityButton">
              <Button onClick={subWorker} disabled={(incrementValue > worker) || !isTimerRunning} small>- {incrementValue}</Button>
              <Button onClick={addWorker} disabled={!isTimerRunning}  small>+ {incrementValue}</Button>
            </div>
          </div>
        </section>
      </article>
    </Frame>
  );
};

export default ItemBox;