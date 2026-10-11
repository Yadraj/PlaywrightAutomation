const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('h3:has-text("ZARA COAT 3")');
    this.CheckoutButton = page.locator("text=Checkout");
  }

  async ValidateProductInCart() {
    const bool = await this.cartProducts.isVisible();
    console.log(bool);
    expect(bool).toBeTruthy();
  }

  async NavigateToCheckout() {
    await this.CheckoutButton.click();
  }
}

module.exports = { CartPage };
