const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { ScanNewContactPage } = require('../pageobjects/ScanNewContactPage');
const { NewContactPage } = require('../pageobjects/NewContactPage');

test.describe('suite @positive', () => {


    test('verify add new contact', async ({ page }) => {

        const login = new LoginPage(page)
        const scan = new ScanNewContactPage(page)
        const contact = new NewContactPage(page)

        //login to IFS Cloud
        await login.gotoLoginPage();
        await login.validLogin('MAVODE', 'YBoeXlNPMmMVUnbP2eeRtUWL1Q6XCn');

        //Navigate to ScanNewContact page
        test.setTimeout(120000);
        await scan.gotoScanPage();


        //verify the label in h4
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


        //verify the text review scanned values 
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
        await contact.clickOkButton();
     
       
     
    



    });



});



