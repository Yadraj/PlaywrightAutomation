const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./Utils/APIUtils");

let token;
let order_id;
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

test("E2E", async ({ page }) => {
  page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); ++i) {
    const text = await rows.nth(i).locator("th").textContent();
    if (response.order_id.includes(text)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderDetails = await page.locator(".col-text").textContent();
  expect(response.order_id.includes(orderDetails)).toBeTruthy();
});
