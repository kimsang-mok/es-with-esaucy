import { IProjector, IState } from "esaucy";
import db from "./database";
import { AddProductToCart } from "./events/AddProductToCart";

interface CartState extends IState {
  /**
   * index would give us number on how many projections we're on
   *
   * e.g. if it takes nine events to get to our state, the index would be 9
   */
  // index: number
  products: {
    [sku: string]: number; //quantiry
  };
}

class AddProductToCartProjector implements IProjector<AddProductToCart, CartState> {
  async project(currentState: CartState, event: AddProductToCart): Promise<CartState> {
    return {
      index: currentState.index + 1,
      products: {
        ...currentState.products,
        [event.sku]: (currentState.products[event.sku] ?? 0) + event.quantity,
      },
    };
  }
}

let state: CartState = {
  index: 0,
  products: {},
};

const addProductToCartProjector = new AddProductToCartProjector();

async function buildState() {
  for (const event of db) {
    console.log(event, state);
    state = await addProductToCartProjector.project(state, event);
    console.log({ state });
  }
}

console.log(buildState());
