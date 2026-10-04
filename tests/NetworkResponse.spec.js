const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./Utils/APIUtils");
const FakePayload = { data: [], message: "No Orders" };

let response;

const loginPayload = {
  userEmail: "yadrajshinde1@gmail.com",
  userPassword: "Yadgodtes@123456",
};

const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

test.beforeAll("API validation", async () => {
  const ApiContext = await request.newContext();
  const apiUtils = new APIUtils(loginPayload, ApiContext);
  response = await apiUtils.createOrder(orderPayload);
});

test("Network Interception", async ({ page }) => {
  page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      let response = await page.request.fetch(route.request());
      let body = JSON.stringify(FakePayload);

      route.fulfill({
        response,
        body,
      });
    },
  );
  await page.locator('button[routerlink*="myorders"]').click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  console.log(await page.locator(".mt-4").textContent());
});
