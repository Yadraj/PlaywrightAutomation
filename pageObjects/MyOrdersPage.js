class MyOrdersPage {
  constructor(page) {
    this.page = page;
  }

  async clickOnViewButton(order_id) {
    await this.page.locator("tbody").waitFor();
    const rows = this.page.locator("tbody tr");
    for (let i = 0; i < (await rows.count()); ++i) {
      const text = await rows.nth(i).locator("th").textContent();
      if (order_id.includes(text)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}
module.exports = { MyOrdersPage };
