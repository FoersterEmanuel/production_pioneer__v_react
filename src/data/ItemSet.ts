
import { ItemType } from "./../services/classes/ItemClass";
import Images from "../assets/images/Images";


export const ItemSet: ItemType[] = [
  {
    id: 100,
    name: "Wooden Log",
    image: Images.wood_log,
    stDev: 0.05,
    startValue: 100,
    workerCost: 80,
    production: {
      produce: 1,
      requiredRounds: 2,
      parents: [
        { id: 0, need: 0, },
      ],
    }
  },
  {
    id: 200,
    name: "Wooden Beam",
    image: Images.wood_beam,
    stDev: 0.05,
    startValue: 200,
    workerCost: 200,
    production: {
      produce: 1,
      requiredRounds: 2,
      parents: [
        { id: 100, need: 1, },
      ],
    }
  },
  {
    id: 300,
    name: "Wooden Plank",
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 300,
    workerCost: 500,
    production: {
      produce: 4,
      requiredRounds: 3,
      parents: [
        { id: 200, need: 1, },
      ],
    }
  },
  {
    id: 400,
    name: "Wooden Board",
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 400,
    workerCost: 1,
    production: {
      produce: 1,
      requiredRounds: 3,
      parents: [
        { id: 300, need: 3, },
      ],
    }
  },
  {
    id: 500,
    name: "Wooden Table",
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 500,
    workerCost: 1,
    production: {
      produce: 1,
      requiredRounds: 2,
      parents: [
        { id: 200, need: 2, },
        { id: 400, need: 1, },
        { id: 1000, need: 1, },
      ],
    }
  },
  {
    id: 600,
    name: "Wood Placeholder1",
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 600,
    workerCost: 1,
    production: {
      produce: 1,
      requiredRounds: 2,
      parents: [
        { id: 1000, need: 1, },
      ],
    },
  }
];