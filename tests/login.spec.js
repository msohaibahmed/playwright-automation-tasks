const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../e2e/pages/loginPage');
const data = require('../testData/testData.json');

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.loginAction(data[1].username, data[1].password);

    console.log('Logging in with credentials:', data[1].username, data[1].password);
    await expect(loginPage.selectors.loginAssertion).toBeVisible();
  });

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.loginAction('invalidUsername@gmail.com', 'invalidPassword');
    await expect(loginPage.selectors.errorMessage).toBeVisible();
  });

  test('Verify Page title', async ({ page }) => {
    await page.goto('http://www.automationpractice.pl/index.php');
    await expect(page).toHaveTitle(/.*Login - My Shop/);
  });
});
