const { test, expect } = require("@playwright/test");

let webContext;
let email;
test.beforeAll(async ({ browser }) => {
  email = "yadrajshinde1@gmail.com";
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Yadgodtes@123456");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("E2E", async ({}) => {
  const productName = "ZARA COAT 3";

  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  const products = page.locator(".card-body");
  await page.waitForLoadState("networkidle");
  //await page.locator('.card-body b').first().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());
  console.log(await products.count());
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator('[routerlink*="cart"]').click();
  await page.locator("div li").first().waitFor(); //explicit wait
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  console.log(bool);
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator('[placeholder*="Country"]').pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator('.user__name [type="text"]').first()).toHaveText(
    email,
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const order_id = await page
    .locator(".em-spacer-1 label")
    .last()
    .textContent();
  console.log(order_id);

  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); ++i) {
    const text = await rows.nth(i).locator("th").textContent();
    if (order_id.includes(text)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderDetails = await page.locator(".col-text").textContent();
  expect(order_id.includes(orderDetails)).toBeTruthy();
});
