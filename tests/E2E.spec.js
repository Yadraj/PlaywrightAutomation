const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/E2ETestData.json")),
);
const { customTest } = require("../Utils/CustomTest");

for (const data of dataset) {
  test(`E2E - ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.Login(data.email, data.password);

    //await page.locator('.card-body b').first().waitFor();
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.AddProductToCart(data.productName);
    await dashboardPage.NavigateToCart();

    //explicit wait
    const cartPage = poManager.getCartPage();
    await cartPage.ValidateProductInCart(data.productName);
    await cartPage.NavigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.validateEmail(data.email);
    await checkoutPage.SelectCountry();
    await checkoutPage.PlaceOrder();

    const orderHistoryPage = poManager.getOrderHistoryPage();
    const order_id = await orderHistoryPage.ValidateOrderId();
    await orderHistoryPage.ValidateThankYouMessage();
    await orderHistoryPage.NavigateToMyOrders();

    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.clickOnViewButton(order_id);

    const orderSummaryPage = poManager.getOrderSummaryPage();
    await orderSummaryPage.ValidateOrderId(order_id);
  });

  customTest.only(`Verify login using custom test data fixture- ${data.productName}`, async ({ page, testDataCustom }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.Login(testDataCustom.email, testDataCustom.password);

    //await page.locator('.card-body b').first().waitFor();
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.AddProductToCart(testDataCustom.productName);
    await dashboardPage.NavigateToCart();

    //explicit wait
    const cartPage = poManager.getCartPage();
    await cartPage.ValidateProductInCart(testDataCustom.productName);
    await cartPage.NavigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.validateEmail(testDataCustom.email);
    await checkoutPage.SelectCountry();
    await checkoutPage.PlaceOrder();

    const orderHistoryPage = poManager.getOrderHistoryPage();
    const order_id = await orderHistoryPage.ValidateOrderId();
    await orderHistoryPage.ValidateThankYouMessage();
    await orderHistoryPage.NavigateToMyOrders();

    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.clickOnViewButton(order_id);

    const orderSummaryPage = poManager.getOrderSummaryPage();
    await orderSummaryPage.ValidateOrderId(order_id);
  });
}
