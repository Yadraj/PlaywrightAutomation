const { test, expect } = require("@playwright/test");

test("Network Abort", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  page.route("**/*.css", (route) => route.abort());
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );

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
