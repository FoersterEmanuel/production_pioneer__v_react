import { useEffect, useState } from "react";

import { useItemsContext } from "../../../services/contexts/ItemsContext";
import { useTimerContext } from "../../../services/contexts/TimerContext";
import { useWalletContext } from "../../../services/contexts/WalletContext";
import { useLanguageContext } from "../../../services/contexts/LanguageContext";

import Frame from "../../../components/generic/Frame";
import Button from "../../../components/Button";
import LoadingBar from "../../../components/LoadingBar";

import Chart from "./Chart";

import Images from "../../../assets/images/Images";

import "./itemBox.css";


const ItemBox = ({ id }: { id: number }) => {
  // global states
  const { getItemById } = useItemsContext();
  const { isTimerRunning, round } = useTimerContext();
  const { coins, addCoins, incrementValue } = useWalletContext();
  const { getWord, language } = useLanguageContext();
  // local states
  const [update, setUpdate] = useState(0);
  const [quantityOwned, setQuantityOwned] = useState(0);
  const [worker, setWoker] = useState(0);
  const [canBuy, setCanBuy] = useState(true);
  const [workflowRun, setWorkflowRun] = useState(false);
  const [workflowStart, setWorkflowStart] = useState(0);
  const [workflowStartWorker, setWorkflowStartWorker] = useState(0);

  // local vars
  const item = getItemById(id);
  const chartValues = item?.getChartValues();
  const parents = ((parents) => {
    if (parents === "root") return "root";
    return parents.map(parent => {
      return {
        ...parent,
        item: getItemById(parent.id)
      }
    });
  })(item!.getProduction().parents);

  const doUpdate = () => {
    setUpdate(Math.random());
  }

  // item quantity
  const changeQuantity = (val: number) => {
    if (item!.addQuantityOwned(val)) doUpdate();
  };
  const buyQuantity = (val: number) => {
    if (addCoins(val * chartValues![round] * -1)) {
      changeQuantity(val);
    }
  }
  const addQuantity = () => { buyQuantity(incrementValue) };
  const subQuantity = () => { buyQuantity(incrementValue * -1) };

  // worker quantity
  const changeWorker = (val: number) => {
    if (item!.addWorker(val)) doUpdate();
  };
  const addWorker = () => { changeWorker(incrementValue) };
  const subWorker = () => { changeWorker(incrementValue * -1) };

  const doWorkflow = () => {
    if (isTimerRunning && worker > 0) {
      if (!workflowRun) {
        const coinsCheck = worker * item!.getWorkerCost() <= coins;
        const isRoot = parents === "root";
        const rootQuantityCheck = isRoot || parents.reduce((acc, parent) => {
          if (!acc) return false;
          return parent.need * worker <= parent.item!.getQuantityOwned()
        }, true);
        if (coinsCheck && rootQuantityCheck) {
          setWorkflowRun(true);
          setWorkflowStart(round);
          setWorkflowStartWorker(worker);
          addCoins(worker * item!.getWorkerCost() * -1);
          if (parents !== "root")
            parents.forEach((parent) => { parent.item!.addQuantityOwned(parent.need * worker * -1); });
        }
      } else if ((round - workflowStart) >= item!.getProduction().requiredRounds) {
        setWorkflowRun(false);
        item!.addQuantityOwned(item!.getProduction().produce * workflowStartWorker)

      }
    }
  }

  useEffect(() => {
    setQuantityOwned(item!.getQuantityOwned());
    setWoker(item!.getWorker())
    setCanBuy(incrementValue * chartValues![round] <= coins);

    doWorkflow();
    // eslint-disable-next-line
  }, [update, round]);

  return (
    <Frame flat>
      <article>
        <div className="item_header">
          <div className="item_info">
            <div className="item_name">{item!.getName(language)}</div>
            <div className="item_quantity">
              <div>{getWord("owned")}: {quantityOwned}</div>
              <div>{chartValues![(isTimerRunning) ? round : chartValues!.length - 1]} {getWord("coins")}</div>
              <div className="item_quantityButton">
                <Button onClick={subQuantity} disabled={(incrementValue > quantityOwned) || !isTimerRunning} small >- {incrementValue}</Button>
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
          <div className="item_info">
            <div className="item_header">
              <div className="item_worker">
                <div className="item_workerQuantity">
                  {getWord("worker")}: {worker}<br />
                  {getWord("cost_per_worker")}: {item!.getWorkerCost()}<br />
                  {getWord("cost")}: <span className={(worker > 0 && (worker * item!.getWorkerCost()) > coins) ? "item_production_noWork" : ""}>{worker * item!.getWorkerCost()}</span><br />
                </div>
                <div className="item_workerQuantityButton">
                  <Button onClick={subWorker} disabled={(incrementValue > worker) || !isTimerRunning} small>- {incrementValue}</Button>
                  <Button onClick={addWorker} disabled={!isTimerRunning} small>+ {incrementValue}</Button>
                </div>
              </div>
            </div>
            <div className="item_workflow">
              {getWord("produced_per_worker")}: {item!.getProduction().produce}<br />
              {getWord("produced")}: {item!.getProduction().produce * worker}<br />
              {getWord("required_rounds")}: {item!.getProduction().requiredRounds}<br />

              {
                (worker === 0)
                  ?
                  <>{getWord("no_worker")}</>
                  : (!workflowRun) ?
                    <>{getWord("cant_work")}</>
                    :
                    <LoadingBar value={(round - workflowStart) / item!.getProduction().requiredRounds} />
              }

            </div>
            <div className="item_parents">
              {
                (parents === "root")
                  ?
                  <div>{getWord("need_nothings")}</div>
                  :
                  <table className="item_parentsTable">
                    <thead>
                      <tr>
                        <th>{getWord("materials")}</th>
                        <th>{getWord("required_per_worker")}</th>
                        <th>{getWord("required")}</th>
                        <th>{getWord("owned")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parents.map((parent, key) => (
                        <tr key={key}>
                          <td>
                            <span className={(worker > 0 && parent.need * worker > parent.item!.getQuantityOwned()) ? "item_production_noWork" : ""}>
                              {parent.item!.getName(language)}
                            </span>
                          </td>
                          <td>{parent.need}</td>
                          <td>{parent.need * worker}</td>
                          <td>{parent.item!.getQuantityOwned()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>


              }
            </div>
          </div>
        </section>
      </article>
    </Frame>
  );
};

export default ItemBox;