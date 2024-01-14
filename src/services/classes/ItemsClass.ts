import { ItemSet } from "../../data/ItemSet";
import ItemClass from "./ItemClass";

export default class Items {
  private update: () => void;

  private items = ItemSet.map(item=>new ItemClass(item));

  constructor(update: () => void) {
    this.update = update;
  }

  public getAllItems = () => this.items;

  public findId = (id:number):ItemClass|null => {
    const itemsList = this.items.filter(item => item.getId() === id);
    if(itemsList.length === 1) return itemsList[0];
    return null;
  };
  public reset = () =>{
    this.items = ItemSet.map(item=>new ItemClass(item));
  }
};


