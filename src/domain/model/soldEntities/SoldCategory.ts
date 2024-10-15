import SoldEntity from "./SoldEntity";

export default class SoldCategory extends SoldEntity {
  constructor(name: string, quantity: number) {
    super(name, quantity);
  }
}
