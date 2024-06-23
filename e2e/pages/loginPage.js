const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      username: page.locator('#email'),
      password: page.locator('#passwd'),
      signIn: page.locator('[title="Log in to your customer account"]'),
      loginAssertion: page.locator('.page-heading').getByText("My account"),
      loginButton: page.locator('#SubmitLogin'),
      errorMessage: page.locator('text=Authentication failed.'),
      showPassword: page.locator('label:has-text("Show password")')
    };
  }

  async gotoLoginPage() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
    await this.selectors.signIn.click();
    await this.selectors.username.waitFor();
  }

  async loginAction(username, password) {
    this._validateCredentials(username, password);

    await this.selectors.username.fill(username);
    await this.selectors.password.fill(password);
    await this.selectors.loginButton.click();
  }

  _validateCredentials(username, password) {
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      throw new Error('Username and password must be non-empty strings');
    }
  }
}

module.exports = { LoginPage };
