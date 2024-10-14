import Express from "./express/Express";
import BillFactory from "./infrastructure/factory/BillFactory";

const billFactory = new BillFactory();
const [billRouter] = billFactory.createRouters();
const billApp = new Express([billRouter]);
billApp.start();
