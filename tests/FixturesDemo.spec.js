const { expect } = require("@playwright/test");
const { customtest } = require("./Utils/fixtures");


customtest("custom fixture test", async ({ authenticatedPage, createOrder,testdata }) => {
  await authenticatedPage.goto("https://rahulshettyacademy.com/client");
  await authenticatedPage.locator('button[routerlink*="myorders"]').click();
  await authenticatedPage.locator("tbody").waitFor();
  await expect(authenticatedPage.getByText(createOrder.order_id)).toBeVisible();
  console.log(testdata.productName);
});
