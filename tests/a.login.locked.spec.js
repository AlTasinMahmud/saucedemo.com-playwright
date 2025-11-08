/*
 * Ans to the QS no 1.
 */

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Login Feature', () => {

    test('should show an error message for a locked_out_user', async ({ page }) => {
        
        await page.goto('/');

        
        const usernameInput = page.locator('#user-name');
        await usernameInput.fill('locked_out_user');

        const passwordInput = page.locator('#password');
        await passwordInput.fill('secret_sauce');
       
        const loginButton = page.locator('#login-button');
        await loginButton.click();

        // Verify the error message
        const errorElement = page.locator('[data-test="error"]');
        const expectedError = 'Epic sadface: Sorry, this user has been locked out.';
        
        await expect(errorElement).toBeVisible();
        await expect(errorElement).toHaveText(expectedError);
    });

});