import CustomersData from "../../application/CustomersData";
import KPIsManager from "../../application/KPIsManager";
import SalesData from "../../application/SalesData";
import ExpressRouter from "../../express/routes/ExpressRouter";
import DatabaseEnvironment from "../../util/database/config/DatabaseEnvironment";
import MySqlDBC from "../../util/database/MySqlDBC";
import MySqlConnectionConfig from "../../util/database/types/ConnectionInterface";
import DataController from "../express/controller/DataController";
import KPIsController from "../express/controller/KPIsController";
import DataRouter from "../express/routes/DataRouter";
import KPIsRouter from "../express/routes/KPIsRouter";
import CustomerAmountProvider from "../repository/provider/CustomerAmountProvider";
import SalesProvider from "../repository/provider/SalesProvider";
import SoldAmountProvider from "../repository/provider/SoldAmountProvider";
import SoldEntitiesProvider from "../repository/provider/SoldEntitiesProvider";
import TransactionSizeProvider from "../repository/provider/TransactionSizeProvider";

export default class KPIsFactory {
  public createRouters(): ExpressRouter[] {
    //MySQL
    const databaseEnvironment = new DatabaseEnvironment();
    const mySqlConnectionConfig: MySqlConnectionConfig = {
      host: databaseEnvironment.DB_HOST,
      user: databaseEnvironment.DB_USER,
      password: databaseEnvironment.DB_PASSWORD,
      database: databaseEnvironment.DATABASE,
      port: databaseEnvironment.DB_PORT,
    };
    const mySqlDbc = new MySqlDBC(mySqlConnectionConfig);

    //Providers
    const customerAmountProvider = new CustomerAmountProvider(mySqlDbc);
    const salesProvider = new SalesProvider(mySqlDbc);
    const soldAmountProvider = new SoldAmountProvider(mySqlDbc);
    const soldEntitiesProvider = new SoldEntitiesProvider(mySqlDbc);
    const transactionSizeProvider = new TransactionSizeProvider(mySqlDbc);

    //Application
    const kpisManager = new KPIsManager(salesProvider, transactionSizeProvider);
    const salesData = new SalesData(soldEntitiesProvider, soldAmountProvider);
    const customersData = new CustomersData(customerAmountProvider);

    //Controllers
    const dataController = new DataController(salesData, customersData);
    const kpisController = new KPIsController(kpisManager);

    //Router
    const dataRouter = new DataRouter(dataController);
    const kpisRouter = new KPIsRouter(kpisController);

    return [dataRouter, kpisRouter];
  }
}
