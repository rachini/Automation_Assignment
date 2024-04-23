const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

test.describe('suite @negative', () => {


    test('TC1', async ({ page }) => {

        const login = new LoginPage(page)

        await login.gotoLoginPage();
        await login.invalidLogin('MV', 'MVN');
        await expect(page.locator('//*[@id="kc-content-wrapper"]/div[1]/span')).toHaveText('Invalid username or password.');


    });



});