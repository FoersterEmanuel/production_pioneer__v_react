import { createContext, useContext, useEffect, useState } from "react";

import ItemClass from "../classes/ItemClass";
import ItemsClass from "../classes/ItemsClass";

type ItemsContextProps = {
  getItemById: (id: number) => ItemClass | null,
  getAllItems: () => ItemClass[]
};
const ItemContextInit: ItemsContextProps = {
  getItemById: () => null,
  getAllItems: () => { return [] }
}
const ItemsContext = createContext(ItemContextInit);

interface ItemProps {
  children: React.ReactNode;
}

export const ItemsProvider = ({ children }: ItemProps) => {

  const [update, setUpdate] = useState(0);

  const items = new ItemsClass(() => { setUpdate(Math.random()) });

  const getItemById = (id:number): ItemClass | null => {
    return items.findId(id);
  };

  useEffect(() => {

  }, [update]);

  return (
    <ItemsContext.Provider value={{
      getItemById,
      getAllItems: items.getAllItems,
    }}>
      {children}
    </ItemsContext.Provider>
  );
};
export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('itemContext error');
  }
  return context;
};