import SoldEntity from "./SoldEntity";

export default class SoldProduct extends SoldEntity {
    constructor(name: string, quantity: number) {
        super(name, quantity);
    }
}