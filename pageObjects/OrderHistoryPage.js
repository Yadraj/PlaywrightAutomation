const { expect } = require("@playwright/test");

class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.OrderId = page.locator(".em-spacer-1 label");
    this.ValidateThankYouText = page.locator(".hero-primary");
    this.NavigateToMyOrdersButton = page.locator(
      'button[routerlink*="myorders"]',
    );
  }

  async ValidateThankYouMessage() {
    await expect(this.ValidateThankYouText).toHaveText(
      " Thankyou for the order. ",
    );
  }
  async ValidateOrderId() {
    const order_id = await this.OrderId.last().textContent();
    console.log(order_id);
    return order_id;
  }

  async NavigateToMyOrders() {
    await this.NavigateToMyOrdersButton.click();
  }
}
module.exports = { OrderHistoryPage };
