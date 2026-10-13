const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.CheckoutButton = page.locator("text=Checkout");
  }

  async ValidateProductInCart(productName) {
    await expect(
      this.page.locator(`h3:has-text("${productName}")`),
    ).toBeVisible();
  }

  async NavigateToCheckout() {
    await this.CheckoutButton.click();
  }
}

module.exports = { CartPage };
