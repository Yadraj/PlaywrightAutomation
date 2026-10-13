const base = require("@playwright/test");
const { APIUtils } = require("./APIUtils");
const { request } = require("@playwright/test");

const loginPayload = {
  userEmail: "yadrajshinde1@gmail.com",
  userPassword: "Yadgodtes@123456",
};

const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
let email;
let response;
exports.customtest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    email = "yadrajshinde1@gmail.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Yadgodtes@123456");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await use(page);
    await context.close();
  },
  createOrder: async ({}, use) => {
    const ApiContext = await request.newContext();
    const apiUtils = new APIUtils(loginPayload, ApiContext);
    response = await apiUtils.createOrder(orderPayload);
    use(response);
    await ApiContext.dispose();
  },
  testdata: {
    productName: "adidas original",
  },
});
