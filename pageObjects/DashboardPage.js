class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productTexts = page.locator(".card-body b");
    this.cartButton = page.locator('[routerlink*="cart"]');
  }

  async AddProductToCart(productName) {
    console.log(await this.productTexts.allTextContents());
    console.log(await this.products.count());
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async NavigateToCart() {
    await this.cartButton.click();
    await this.page.locator("div li").first().waitFor();
  }
}
module.exports = { DashboardPage };
