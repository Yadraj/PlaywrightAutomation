const { expect } = require("@playwright/test");

class OrderSummaryPage {
  constructor(page) {
    this.page = page;
    this.orderIdLocator = page.locator(".col-text");
  }

  async ValidateOrderId(order_id) {
    const orderDetails = await this.orderIdLocator.textContent();
    expect(order_id.includes(orderDetails)).toBeTruthy();
  }
}

module.exports = { OrderSummaryPage };
