import BillGenerator from "../../application/BillGenerator";
import BillManager from "../../application/BillManager";
import SendingVia from "../../application/SendingVia";
import ExpressRouter from "../../express/routes/ExpressRouter";
import PDFCreator from "../../helper/PDFCreator";
import DatabaseEnvironment from "../../util/database/config/DatabaseEnvironment";
import MySqlDBC from "../../util/database/MySqlDBC";
import MySqlConnectionConfig from "../../util/database/types/ConnectionInterface";
import EmailEnvironment from "../email/config/EmailEnvironment";
import EmailSender from "../email/EmailSender";
import SMTPConnection from "../email/SMTPConnection";
import KPIsController from "../express/controller/DataController";
import DataRouter from "../express/routes/DataRouter";
import CategoryProvider from "../repository/provider/oldProviders/CategoryProvider";
import CustomerProvider from "../repository/provider/oldProviders/CustomerProvider";
import EmployeeProvider from "../repository/provider/oldProviders/EmployeeProvider";
import ProductProvider from "../repository/provider/oldProviders/ProductProvider";
import PurchaseItemProvider from "../repository/provider/oldProviders/PurchaseItemProvider";
import SoldCartProvider from "../repository/provider/oldProviders/SoldCartProvider";
import SupplierProvider from "../repository/provider/oldProviders/SupplierProvider";
import SoldCartRetriever from "../repository/retriever/SoldCartRetriever";
import CustomerSetter from "../repository/setter/CustomerSetter";
import CreateChatId from "../whatsapp/helper/CreateChatId";
import MessageBill from "../whatsapp/MessageBill";
import WhatsApp from "../whatsapp/WhatsApp";

export default class BillFactory {
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

    //Bill on PDF
    const pdfCreator = new PDFCreator();
    const billGenerator = new BillGenerator(pdfCreator);

    //WhatsApp
    const createChatId = new CreateChatId();
    const messageBill = new MessageBill();
    const whatsapp = new WhatsApp(createChatId, messageBill);

    //Email
    const emailEnvironment = new EmailEnvironment();
    const smtpConnection = new SMTPConnection(emailEnvironment);
    const emailSender = new EmailSender(smtpConnection);

    //Providers
    const customerProvider = new CustomerProvider(mySqlDbc);
    const categoryProvider = new CategoryProvider(mySqlDbc);
    const supplierProvider = new SupplierProvider(mySqlDbc);
    const productProvider = new ProductProvider(
      mySqlDbc,
      categoryProvider,
      supplierProvider
    );
    const purchaseItemProvider = new PurchaseItemProvider(
      mySqlDbc,
      productProvider
    );
    const employeeProvider = new EmployeeProvider(mySqlDbc);
    const soldCartProvider = new SoldCartProvider(
      mySqlDbc,
      purchaseItemProvider,
      employeeProvider,
      customerProvider
    );

    //Repository
    const soldCartRetriever = new SoldCartRetriever(soldCartProvider);
    const customerSetter = new CustomerSetter(mySqlDbc);

    const billManager = new BillManager(
      whatsapp,
      emailSender,
      soldCartRetriever,
      billGenerator
    );

    //SendingVia
    const sendingVia = new SendingVia(customerSetter);

    //Controller
    const billController = new KPIsController(billManager, sendingVia);

    //Router
    const billRouter = new DataRouter(billController);

    return [billRouter];
  }
}
