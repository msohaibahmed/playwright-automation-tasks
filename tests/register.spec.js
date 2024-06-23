const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../e2e/pages/registerPage');
const { faker } = require('@faker-js/faker');

test.describe('Registration Tests', () => {
  test('Create Account', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Generate random user data using Faker
    const userData = {
      gender: 'Mr.',
      firstName: faker.person.firstName('male'),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).getDate().toString(),
      month: (faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).getMonth() + 1).toString(), // getMonth() returns 0-11
      year: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).getFullYear().toString()
    };

    await registerPage.gotoRegisterPage();
    await expect(registerPage.selectors.assertionAuthentication).toBeVisible();

    await registerPage.registrationProcess(userData.email, userData);
    await page.waitForTimeout(1000)
    const currentUrl = page.url();
    console.log(currentUrl)

    await expect(currentUrl).toEqual("http://www.automationpractice.pl/index.php?controller=my-account")

    console.log('Registering with credentials:', userData);
  });
});
