/*
 * Ans to the QS no 3.
 */

const { test, expect } = require('@playwright/test');

test('should log in and complete the flow for the slow user', async ({ page }) => {

    // This command gives this one test a 90-second timeout
    test.setTimeout(90000); // 90 seconds

    // 1. Go to www.saucedemo.com
    await page.goto('/');

    // 2. Login with performance_glitch_user
    await page.locator('#user-name').fill('performance_glitch_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    
    // 3. Verify the login was successful
    await expect(page.locator('.title')).toHaveText('Products');

    // 4. Reset the App State
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#reset_sidebar_link').click();
    await page.locator('#react-burger-cross-btn').click();

    // sorting
    await page.locator('.product_sort_container').selectOption('za');


    // Select the first product 2 the cart
    const firstProduct = page.locator('.inventory_item').first();
    const expectedProductName = await firstProduct.locator('.inventory_item_name').innerText();
    await firstProduct.locator('button.btn_inventory').click();

    // checkout page
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    
    // Fill info
    await page.locator('#first-name').fill('Mahmud');
    await page.locator('#last-name').fill('Hridoy');
    await page.locator('#postal-code').fill('00000');
    await page.locator('#continue').click();

    // 8. Verification
    const overviewProductName = await page.locator('.inventory_item_name').innerText();
    expect(overviewProductName).toEqual(expectedProductName);

    const itemTotalText = await page.locator('.summary_subtotal_label').innerText();
    const taxText = await page.locator('.summary_tax_label').innerText();
    const totalText = await page.locator('.summary_total_label').innerText();

    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    const actualTotal = parseFloat(totalText.replace('Total: $', ''));
    const expectedTotal = itemTotal + tax;
    
    expect(actualTotal).toBeCloseTo(expectedTotal);

    
    await page.locator('#finish').click();

    //  successful order Message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    //  reset the App State
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#reset_sidebar_link').click();
    await page.locator('#react-burger-cross-btn').click();
    
    //  Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    
    await expect(page.locator('#login-button')).toBeVisible();
});