const { test, expect } = require("@playwright/test");

test("Client App", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());

  await page.locator("#userEmail").fill("yadrajshinde1@gmail.com");
  await page.locator("#userPassword").fill("Yadgodtes@123456");
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());
});

test.only("Test2", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signInBtn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await username.fill("rahulshettyacadem");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();

  console.log(await page.locator("[style*=block]").textContent());
  await expect(page.locator("[style*=block]")).toContainText("Incorrect");

  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signInBtn.click();

  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());

  console.log(await page.locator(".card-body a").allTextContents());
});

test("Select And Radio Button", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await page.locator(".form-control").last().selectOption("consult");
  await page.locator(".radiotextsty").nth(1).click();
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();

  expect(await page.locator(".radiotextsty").nth(1).isChecked()).toBeTruthy();
});
