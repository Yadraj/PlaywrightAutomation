const { test, expect } = require("@playwright/test");
const { Loginpage } = require("../pageObjects/Loginpage");
const { DashboardPage } = require("../pageObjects/DashboardPage");
const { CheckoutPage } = require("../pageObjects/CheckoutPage");
const { CartPage } = require("../pageObjects/CartPage");
const { OrderHistoryPage } = require("../pageObjects/OrderHistoryPage");
const { MyOrdersPage } = require("../pageObjects/MyOrdersPage");
const { OrderSummaryPage } = require("../pageObjects/OrderSummaryPage");

test("E2E", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const email = "yadrajshinde1@gmail.com";
  const password = "Yadgodtes@123456";

  const loginPage = new Loginpage(page);
  await loginPage.goTo();
  await loginPage.Login(email, password);
  //await page.locator('.card-body b').first().waitFor();
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.AddProductToCart(productName);
  await dashboardPage.NavigateToCart();

  //explicit wait
  const cartPage = new CartPage(page);
  await cartPage.ValidateProductInCart();
  await cartPage.NavigateToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.validateEmail(email);
  await checkoutPage.SelectCountry();
  await checkoutPage.PlaceOrder();

  const orderHistoryPage = new OrderHistoryPage(page);
  const order_id = await orderHistoryPage.ValidateOrderId();
  await orderHistoryPage.ValidateThankYouMessage();
  await orderHistoryPage.NavigateToMyOrders();

  const myOrdersPage = new MyOrdersPage(page);
  await myOrdersPage.clickOnViewButton(order_id);

  const orderSummaryPage = new OrderSummaryPage(page);
  await orderSummaryPage.ValidateOrderId(order_id);
});
