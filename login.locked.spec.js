/*
 * tests/login.locked.spec.js
 */

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Login Feature', () => {

    test('should show an error message for a locked_out_user', async ({ page }) => {
        // 1. Open the login page (uses baseURL from config)
        await page.goto('/');

        // 2. Find and fill in the username
        // Playwright's locators are powerful
        const usernameInput = page.locator('#user-name');
        await usernameInput.fill('locked_out_user');

        // 3. Find and fill in the password
        const passwordInput = page.locator('#password');
        await passwordInput.fill('secret_sauce');

        // 4. Find and click the login button
        const loginButton = page.locator('#login-button');
        await loginButton.click();

        // 5. Verify the error message
        const errorElement = page.locator('[data-test="error"]');
        const expectedError = 'Epic sadface: Sorry, this user has been locked out.';

        // Playwright's 'expect' auto-waits for the element to exist
        await expect(errorElement).toBeVisible();
        await expect(errorElement).toHaveText(expectedError);
    });

});