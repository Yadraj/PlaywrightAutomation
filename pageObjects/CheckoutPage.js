const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.country = page.locator('[placeholder*="Country"]');
    this.dropdown = page.locator(".ta-results");
    this.PlaceOrderButton = page.locator(".action__submit");
    this.emailOnCheckout = page.locator('.user__name [type="text"]');
  }

  async SelectCountry() {
    await this.country.pressSequentially("ind");
    const dropdown = this.dropdown;
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async validateEmail(email) {
    await expect(this.emailOnCheckout.first()).toHaveText(email);
  }
  async PlaceOrder() {
    await this.PlaceOrderButton.click();
  }
}
module.exports = { CheckoutPage };
