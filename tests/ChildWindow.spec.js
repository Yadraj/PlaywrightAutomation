const { test, expect } = require("@playwright/test");

test("Test1", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("#username");
  const documentLink = page.locator(".blinkingText");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await expect(documentLink.first()).toHaveAttribute("class", "blinkingText");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.first().click(),
  ]);

  console.log(await newPage.locator(".red").textContent());
  const text = await newPage.locator(".red").textContent();
  const email = text.split("@")[1].split(" ")[0];
  console.log(email);

  await username.fill(email);

  console.log("Main page value: " + (await username.inputValue()));
});
