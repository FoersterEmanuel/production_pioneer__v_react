
import { ItemType } from "./../services/classes/ItemClass";
import Images from "../assets/images/Images";


export const ItemSet: ItemType[] = [
  {
    id: 100,
    name: {
      "en": "Wooden Log",
      "de": "Holzstamm"
    },
    image: Images.wood_log,
    stDev: 0.05,
    startValue: 100,
    workerCost: 80,
    production: {
      produce: 1,
      requiredRounds: 3,
      parents: "root",
    }
  },
  {
    id: 200,
    name: {
      "en": "Wooden Beam",
      "de": "Holzbalken"
    },
    image: Images.wood_beam,
    stDev: 0.05,
    startValue: 200,
    workerCost: 120,
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
    name: {
      "en": "Wooden Plank",
      "de": "Holzbrett"
    },
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 400,
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
    name: {
      "en": "Wooden Board",
      "de": "Holzplatte"
    },
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 800,
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
    name: {
      "en": "Wooden Table",
      "de": "Holztisch"
    },
    image: Images.wood_plank,
    stDev: 0.05,
    startValue: 1600,
    workerCost: 1,
    production: {
      produce: 1,
      requiredRounds: 2,
      parents: [
        { id: 200, need: 2, },
        { id: 400, need: 1, },
      ],
    }
  }
];