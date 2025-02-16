import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //Open url for every test
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test.afterEach(async ({ page }) => {
  console.log('Test completed, cleaning up...');
  //Logout and close browser
  await fnLogout(page);
});

test('Successful purchase item from listed products.', async ({ page }) => {
  // Login into application using standard user "Username: standard_user"
  await fnLogin(page);
  // Select item to purchase
  await fnSelectItem(page);
  // check out information like first name last name
  await fnCheckOutInformation(page);
  //Verify item text
  await fnVerifyItemname(page, 'Sauce Labs Bike Light');
  //verify shipping information
  await fnVerifyShippingInformation(page);
  //verify total price
  await fnVerifyTotalPrice(page, 'Total: $10.79');
  //click finish
  await fnClickFinish(page);
  // verify order placed text message
  await fnVerifyOrderPlaced(page);
});

async function fnLogin(page: Page) {
  // Login into application using standard user "Username: standard_user"
  await page.locator('[data-test="username"]').fill('standard_user');
  // Enter password
  await page.locator('[data-test="password"]').fill('secret_sauce');
  // click on login button
  await page.locator('[data-test="login-button"]').click();
  // verify login successful
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  console.log('Login as Standard User was successful');
}

async function fnSelectItem(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  //add to cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  //checkout
  await page.locator('[data-test="checkout"]').click();
  console.log('Add Item to Cart');
}

async function fnCheckOutInformation(page: Page) {
  //Enter first name
  await page.locator('[data-test="firstName"]').fill('Archana');
  //Enter Last name
  await page.locator('[data-test="lastName"]').fill('Jain');
  // Enter postal code
  await page.locator('[data-test="postalCode"]').fill('2148');
  // Click on Continue button
  await page.locator('[data-test="continue"]').click();
  console.log('Enter personal information');
}

async function fnVerifyItemname(page: Page, sItemName: string) {
  //verify item as described
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
    sItemName
  );
  console.log('Verify item name : ' + sItemName);
}

async function fnVerifyShippingInformation(page: Page) {
  await expect(page.locator('[data-test="shipping-info-value"]')).toContainText(
    'Free Pony Express Delivery!'
  );
  console.log('Verify shipping info value');
}

async function fnVerifyTotalPrice(page: Page, sTotalprice: string) {
  //verify total amount
  await expect(page.locator('[data-test="total-label"]')).toContainText(
    sTotalprice
  );
  console.log('Verify total amount : ' + sTotalprice);
}

async function fnClickFinish(page: Page) {
  //click finish button
  await page.locator('[data-test="finish"]').click();
  console.log('Click Finished');
}

async function fnVerifyOrderPlaced(page: Page) {
  //verify order page message
  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    'Thank you for your order!'
  );
  console.log('Verify order placed');
}

async function fnLogout(page: Page) {
  //logout
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  console.log('Logout');

  await page.close(); // Close the browser
  console.log('Browser closed');
}
