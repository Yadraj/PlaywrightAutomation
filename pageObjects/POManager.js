const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { MyOrdersPage } = require("./MyOrdersPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.myOrdersPage = new MyOrdersPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
    this.orderSummaryPage = new OrderSummaryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getMyOrdersPage() {
    return this.myOrdersPage;
  }
  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
  getOrderSummaryPage() {
    return this.orderSummaryPage;
  }
}
module.exports = { POManager };
