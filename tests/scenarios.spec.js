const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { ScanNewContactPage } = require('../pageobjects/ScanNewContactPage');

test.describe('suite @positive', () => {


    test('TC1', async ({ page }) => {

        const login = new LoginPage(page)
        const scan = new ScanNewContactPage(page)

        await login.gotoLoginPage();
        await login.validLogin('MAVODE', 'YBoeXlNPMmMVUnbP2eeRtUWL1Q6XCn');

        //Navigate to ScanNewContact page
        test.setTimeout(120000);
        await page.goto('https://topo-d02.build.ifsdemoworld.com/main/ifsapplications/web/assistant/ScanNewContact/ScanNewContactAssistant;path=0.279000411.615228976.1142250054.1092084979');


        //verify the text
        await expect(page.locator('//*[@id="ScanNewContactAssistant-StepIndicatorLabel-0"]')).toHaveText('Scan Business Card', { timeout: 50000 });

        //upload image
        await scan.uploadImage();

        //save the image
        await scan.saveButton();

        //navigate to next page
        await scan.nextButton();




    });



});

test.describe('suite @negative1', () => {


    test('TC2', async ({ page }) => {

        const login = new LoginPage(page)

        await login.gotoLoginPage();
        await login.invalidLogin('MV', 'MVN');
        await expect(page.locator('//*[@id="kc-content-wrapper"]/div[1]/span')).toHaveText('Invalid username or password.');


    });



});

