const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { ScanNewContactPage } = require('../pageobjects/ScanNewContactPage');
const { NewContactPage } = require('../pageobjects/NewContactPage');

test.describe('suite @positive', () => {


    test('TC1', async ({ page }) => {

        const login = new LoginPage(page)
        const scan = new ScanNewContactPage(page)
        const contact = new NewContactPage(page)

        //login to IFS Cloud
        await login.gotoLoginPage();
        await login.validLogin('MAVODE', 'YBoeXlNPMmMVUnbP2eeRtUWL1Q6XCn');

        //Navigate to ScanNewContact page
        test.setTimeout(120000);
        const url = 'https://topo-d02.build.ifsdemoworld.com/main/ifsapplications/web/assistant/ScanNewContact/ScanNewContactAssistant;path=0.279000411.615228976.1142250054.1092084979';
        await scan.navigateToUrl(url);


        //verify the text in h4
        await scan.getH4Text('Scan Business Card', { timeout: 50000 });

        //upload image
        await scan.uploadImage();

        //verify the save button 
        await expect(scan.isSaveButtonEnabled()).resolves.toBe(true);

        const saveButtonText = await scan.getSaveButtonText();
        expect(saveButtonText).toBe('Save');

        //click save button
        await scan.saveButton();

        //verify the delete button
        await expect(scan.isDeleteButtonEnabled()).resolves.toBe(true);

        const deleteButtonText = await scan.getDeleteButtonText();
        expect(deleteButtonText).toBe('Delete');


        //navigate to next page
        await scan.nextButton();

        //verify the toast message after click Next
        await scan.toastMessageText('Scanning uploaded image', { timeout: 50000 });


        //verify the review scanned values text
        await scan.getH4Text2('Review Scanned Values');

        //click launch button
        await scan.launchButton();

        //verify page text
        await contact.pageText('New Contact');

        //uncheck new field
        await contact.uncheckToggleButton();

        //click find
       await contact.clickArrow();
       await contact.clickByText('Find');

        //select the value '100001'
        await contact.clickElement('#filterPane-fndFieldFilter-CustomerId i');
        await contact.clickElementByPlaceholder('Filter');
        await contact.fillInputByPlaceholder('Filter', '100001');
        await contact.pressEnterOnElementByPlaceholder('Filter');
        await contact.clickElementByIdAndText('fndRow-0-CustomerId-StaticField', '100001');
      // await contact.clickButtonByRoleAndTitle('button', 'OK');
    



    });



});



