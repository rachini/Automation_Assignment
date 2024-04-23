const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { ScanNewContactPage } = require('../pageobjects/ScanNewContactPage');

test.describe('suite @negative', () => {


    test('Verify invalid login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.gotoLoginPage();
        await login.invalidLogin('MV', 'MVN');

        //verify invalid message
        const invalidText = await login.getText();
        expect(invalidText).toBe('Invalid username or password.');


    });

    test('verify invalid image upload', async ({ page }) => {

        const login = new LoginPage(page);
        const scan = new ScanNewContactPage(page);


        //login to IFS Cloud
        await login.gotoLoginPage();
        await login.validLogin('MAVODE', 'YBoeXlNPMmMVUnbP2eeRtUWL1Q6XCn');

        //Navigate to ScanNewContact page
        test.setTimeout(120000);
        const url = 'https://topo-d02.build.ifsdemoworld.com/main/ifsapplications/web/assistant/ScanNewContact/ScanNewContactAssistant;path=0.279000411.615228976.1142250054.1092084979';
        await scan.navigateToUrl(url);


        //upload image
        await scan.invalidUpload();

        //verify the toast message for an invalid image upload
        await scan.invalidUploadToastMessage('You can select only an image', { timeout: 50000 });


    });



});