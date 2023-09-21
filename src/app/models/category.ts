import { Item } from "./item";

export class Category {
  constructor(public key: string, public items: Item[] = []) {

  }
}
