const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      registerEmail: page.locator('#email_create'),
      signIn: page.locator('[title="Log in to your customer account"]'),
      btnCreateAccount: page.locator('#SubmitCreate'),
      assertionAuthentication: page.locator('.page-heading').getByText("Authentication"),
      assertionCreateAccount: page.locator('.page-heading').getByText("Create an account"),
      assertionPersonalInfo: page.locator('.page-subheading').getByText("Your personal information"),
      errorMessage: page.locator('text=Authentication failed.'),
      title: page.locator('#id_gender1'),
      firstName: page.locator('#customer_firstname'),
      lastName: page.locator('#customer_lastname'),
      email: page.locator('#email'),
      password: page.locator('#passwd'),
      days: page.locator('#days'),
      months: page.locator('#months'),
      years: page.locator('#years'),
    //  register:page.getByRole('button', { name: 'submitAccount' }),
      register: page.locator("#submitAccount"),
      confirmRegistrationMessage: page.locator('text=Your account has been created.')
    };
  }

  async gotoRegisterPage() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
    await this.selectors.signIn.click();
  }

  async registrationProcess(registerEmail, userData) {
    this._validateEmail(registerEmail);
    this._validateUserData(userData);

    await this.selectors.registerEmail.fill(registerEmail);
    await this.selectors.btnCreateAccount.click();
    await expect(this.page).toHaveURL(/controller=authentication&back=my-account#account-creation/);
    await expect(this.selectors.assertionCreateAccount).toBeVisible();
    await expect(this.selectors.assertionPersonalInfo).toBeVisible();

    await this.selectGender(userData.gender);
    await this.selectors.firstName.fill(userData.firstName);
    await this.selectors.lastName.fill(userData.lastName);
    await this.selectors.email.fill(userData.email);
    await this.selectors.password.fill(userData.password);

    // Fill date of birth
    await this.selectors.days.selectOption(userData.day);
    await this.selectors.months.selectOption(userData.month);
    await this.selectors.years.selectOption(userData.year);

    await this.selectors.register.click();
  }

  async selectGender(gender) {
    const genderSelector = gender === 'Mr.' ? '#id_gender1' : '#id_gender2';
    const genderRadio = this.page.locator(genderSelector);

    await genderRadio.click();
    await expect(genderRadio).toBeChecked();
  }

  _validateEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) {
      throw new Error('Email must be a valid string containing "@"');
    }
  }

  _validateUserData(userData) {
    const requiredFields = ['gender', 'firstName', 'lastName', 'email', 'password', 'day', 'month', 'year'];
    for (const field of requiredFields) {
      if (typeof userData[field] !== 'string' || !userData[field].trim()) {
        throw new Error(`User data must include a valid ${field}`);
      }
    }
  }
}

module.exports = { RegisterPage };
