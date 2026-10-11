class Loginpage {
  constructor(page) {
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.login = page.locator("#login");
  }

  goTo() {
    this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async Login(email, password) {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.login.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { Loginpage };
