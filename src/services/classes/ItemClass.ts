import configData from "../../data/config";
import { boxMullerTransform } from "../BoxMullerTransform";

export interface ItemType {
  id: number;
  name: string;
  image: string;
  stDev: number;
  startValue: number;
  workerCost: number;
  production: {
    produce: number;
    requiredRounds: number;
    parents: "root" | {
      id: number;
      need: number;
    }[]
  };
}

export default class Item {

  private quantityOwned: number = 0;
  private worker: number = 0;
  private chartValues: number[] = [];

  constructor(private itemProps: ItemType) {
    this.clear();
  }
  private clear = () => {
    this.quantityOwned = 0;
    this.worker = 0;
    this.chartValues = [];
    this.chartValues = new Array(configData.steps).fill(0).reduce(acc => {
      const last = acc[acc.length - 1];
      const next = last * boxMullerTransform(1, this.itemProps.stDev);
      return [...acc, next];
    }, [this.itemProps.startValue]).map((val: number) => Math.trunc(val));
  };

  public getId = () => this.itemProps.id;
  public getName = () => this.itemProps.name;
  public getImage = () => this.itemProps.image;
  public getQuantityOwned = (): number => this.quantityOwned;
  public getWorker = (): number => this.worker;
  public getWorkerCost = (): number => this.itemProps.workerCost;
  public getChartValues = (): number[] => this.chartValues;

  public addQuantityOwned = (val: number): boolean => {
    if (this.quantityOwned + val < 0) return false;
    this.quantityOwned += val;
    return true;
  };
  public addWorker = (val: number): boolean => {
    if (this.worker + val < 0) return false;
    this.worker += val;
    return true;
  };
}
