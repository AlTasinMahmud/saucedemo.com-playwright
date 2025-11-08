/*
 * Ans to the QS no 2.
 */

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Standard User Flow', () => {

    test('should add three items and complete the purchase', async ({ page }) => {

        //  Login with standard_user
        await page.goto('/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        
        // Wait 
        await expect(page.locator('.app_logo')).toBeVisible();

        //  reset the App State
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#reset_sidebar_link').click();
        
        await page.locator('#react-burger-cross-btn').click();
                
        const expectedItemNames = [];
        
        
        const itemContainers = page.locator('.inventory_item');
       
        for (let i = 0; i < 3; i++) {
            const item = itemContainers.nth(i);
            const itemName = await item.locator('.inventory_item_name').innerText();
            expectedItemNames.push(itemName);
            await item.locator('button.btn_inventory').click();
        }

        // Verify that 3 products have been added to the cart
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // click cart
        await page.locator('.shopping_cart_link').click();
        await expect(page.url()).toContain('/cart.html');

        // checkout
        await page.locator('#checkout').click();
        await expect(page.url()).toContain('/checkout-step-one.html');

        // fill the form with random values
        await page.locator('#first-name').fill('Mahmud');
        await page.locator('#last-name').fill('Hridoy');
        await page.locator('#postal-code').fill('12345');

        // Continue
        await page.locator('#continue').click();
        await expect(page.url()).toContain('/checkout-step-two.html');

        // 8. Verification
        const overviewItemNames = await page.locator('.inventory_item_name').allInnerTexts();
        expect(overviewItemNames).toEqual(expectedItemNames);

        
        const itemTotalText = await page.locator('.summary_subtotal_label').innerText();
        const taxText = await page.locator('.summary_tax_label').innerText();
        const totalText = await page.locator('.summary_total_label').innerText();

        // Parse the numbers from the text
        const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
        const tax = parseFloat(taxText.replace('Tax: $', ''));
        const actualTotal = parseFloat(totalText.replace('Total: $', '')); // <-- This was the broken line
        
        
        const expectedTotal = itemTotal + tax;
        
        // Use toBeCloseTo for financial calculations to avoid floating point errors
        expect(actualTotal).toBeCloseTo(expectedTotal);

        
        await page.locator('#finish').click();

        //  Verify successful message
        await expect(page.url()).toContain('/checkout-complete.html');
        const successMessage = page.locator('.complete-header');
        await expect(successMessage).toHaveText('Thank you for your order!');

        //  Reset the App State
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#reset_sidebar_link').click();
        
    
        await page.locator('#react-burger-cross-btn').click();
        
        
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();

        // logout confirmation
        await expect(page.locator('#login-button')).toBeVisible();
    });
});