import Express from "./express/Express";
import KPIsFactory from "./infrastructure/factory/KPIsFactory";

const kpisFactory = new KPIsFactory();
const routers = kpisFactory.createRouters();
const billApp = new Express(routers);
billApp.start();
