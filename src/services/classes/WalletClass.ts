import configData from "../../data/config"

export default class WalletClass {
  private update: () => void;
  private incrementValue = configData.incrementValues[0];

  constructor(update: () => void) {
    this.update = update;
  }

  private startCoins = configData.startCoins;
  private coins = 0;

  public reset = () => {
    this.coins = this.startCoins;
    this.update();
  };

  public getCoins = (): number => this.coins;

  public addCoins = (val: number): boolean => {
    if (this.coins + val < 0 ) return false;
    this.coins += val;
    this.update();
    return true;
  }

  public getIncrementValue = (): number => this.incrementValue;

  public setIncrementValue = (val: number): void => {
    this.incrementValue = val;
    this.update();
  };
};