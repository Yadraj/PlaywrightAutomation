const { test, expect } = require("@playwright/test");

test("Network Request", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());

  const email = "yadrajshinde1@gmail.com";

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Yadgodtes@123456");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  console.log(await page.locator(".card-body b").first().waitFor());
  await page.locator('button[routerlink*="myorders"]').click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ac2262c2be7a4bc2b884c79",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ac2262c2be7a4bc2b884c70",
      }),
  );
  await page.locator('button:has-text("View")').first().click();

  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
