const { test, expect } = require("@playwright/test");

test("Locators", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption({ label: "Female" });
  await expect(page.getByLabel("Gender")).toHaveValue("Female");
  
  await page.getByPlaceholder("Password").fill("Yadraj");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Success")).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator('app-card').filter({'hasText': 'Samsung Note 8'})
  .getByRole("button").click();
});