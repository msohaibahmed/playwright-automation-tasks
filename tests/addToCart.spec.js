const { test, expect } = require('@playwright/test');
const { AddToCartPage } = require('../e2e/pages/addToCartPage');
const { LoginPage } = require('../e2e/pages/loginPage');
const data = require('../testData/testData.json');

test.describe('Add to Cart Tests', () => {
  test('Add to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addToCartPage = new AddToCartPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.loginAction(data[1].username, data[1].password);

    console.log('Logging in with credentials:', data[1].username, data[1].password);
    await expect(loginPage.selectors.loginAssertion).toBeVisible();

    await addToCartPage.addToCartProcess();
    console.log('List Item Text:', await addToCartPage.selectors.listItemByText.textContent());
  });
});
