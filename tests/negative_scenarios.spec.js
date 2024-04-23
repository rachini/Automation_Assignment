const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

test.describe('suite @negative', () => {


    test('TC1', async ({ page }) => {

        const login = new LoginPage(page)

        await login.gotoLoginPage();
        await login.invalidLogin('MV', 'MVN');
       
        //verify invalid message
        const invalidText = await login.getText();
        expect(invalidText).toBe('Invalid username or password.');


    });



});