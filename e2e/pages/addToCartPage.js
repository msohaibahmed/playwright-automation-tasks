const { expect } = require('@playwright/test');

class AddToCartPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      dressTab: page.getByRole('link', { name: 'Dresses', exact: true }),
      dressPageAssert: page.locator(".category-name").getByText("Dresses"),
      listItemByText: page.locator('text=Product available with different options').nth(0),
      listItem: page.locator('img[src="http://www.automationpractice.pl/img/p/1/0/10-home_default.jpg"]'),
      pinkColor: page.locator("#color_24"),
      btnAddToCart: page.locator("#add_to_cart"),
      prdtAddAssert: page.getByText("Product successfully added to your shopping cart"),
      proceedToCheckout: page.getByTitle("Proceed to checkout"),
      btnProceedToCheckout: page.getByRole('link', { name: 'Proceed to checkout'}).filter({ title: 'Proceed to checkout' }),
      cartTitle: page.locator("#cart_title").getByText("Shopping-cart summary"),
      assertionText1: page.getByText("To add a new address, please fill out the form below."),
      registerForm: page.locator("#add_address"),
    };
  }

  async addToCartProcess() {
    const {
      dressTab,
      dressPageAssert,
      listItem,
      pinkColor,
      btnAddToCart,
      prdtAddAssert,
      proceedToCheckout,
      cartTitle,
      btnProceedToCheckout,
      assertionText1,
      registerForm,
    } = this.selectors;

    await dressTab.click();
    await expect(dressPageAssert).toBeVisible();
    await expect(listItem).toBeVisible();
    await listItem.click();
    await pinkColor.click();
    await expect(btnAddToCart).toBeVisible();
    await btnAddToCart.click();
    await expect(prdtAddAssert).toBeVisible();
    await expect(proceedToCheckout).toBeVisible();
    await proceedToCheckout.click();
    await expect(cartTitle).toBeVisible();
    await expect(btnProceedToCheckout).toBeVisible();
    await btnProceedToCheckout.click();
    await expect(assertionText1).toBeVisible();
    await expect(registerForm).toBeVisible();
  }
}

module.exports = { AddToCartPage };
