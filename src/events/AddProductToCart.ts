import { IEvent } from "esaucy";

export class AddProductToCart implements IEvent {
  eventName = "AddProductToCart";
  version = 1;
  timestamp: Date;

  constructor(public sku: string, public quantity: number) {
    this.timestamp = new Date();
  }
}
