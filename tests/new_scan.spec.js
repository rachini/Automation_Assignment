import { test, expect } from '@playwright/test';


test('scan new contact', async ({ page }) => {
    test.setTimeout(120000);

    //login to IFS cloud
    await page.goto('https://topo-d02.build.ifsdemoworld.com/');
    await page.getByRole('link', { name: 'IFS Cloud IFS Cloud employee' }).click();
    await page.getByPlaceholder('Ex. johnsmith').fill('MAVODE');
    await page.getByPlaceholder('●●●●●●●●●●').click();
    await page.getByPlaceholder('●●●●●●●●●●').fill('YBoeXlNPMmMVUnbP2eeRtUWL1Q6XCn');
    await page.getByRole('button', { name: 'Log in' }).click();

    //Loading page
    await page.goto('https://topo-d02.build.ifsdemoworld.com/main/ifsapplications/web/assistant/ScanNewContact/ScanNewContactAssistant;path=0.279000411.615228976.1142250054.1092084979');


    //verify the text
    await expect(page.locator('//*[@id="ScanNewContactAssistant-StepIndicatorLabel-0"]')).toHaveText('Scan Business Card', { timeout: 50000 });

    //image upload
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Browse').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('/Users/admin/Downloads/BC002.png');

    //verify the save button name and its enable
    await expect(page.locator('div').filter({ hasText: /^Save$/ })).toHaveText('Save', { timeout: 50000 });;
    await expect(page.locator('div').filter({ hasText: /^Save$/ })).toBeEnabled();
    await page.getByText('Save').click();

    //verify the delete button and its enable
    await expect(page.locator('div').filter({ hasText: /^Delete$/ })).toHaveText('Delete', { timeout: 50000 });
    await expect(page.locator('div').filter({ hasText: /^Delete$/ })).toBeEnabled();
    await page.getByRole('button', { name: 'Next' }).click();


    //verify the toast message after click Next
    await expect(page.locator('role=alert')).toHaveText('Scanning uploaded image', { timeout: 50000 });

    //verify text 'Review Scanned Values'
    await expect(page.locator('id=ScanNewContactAssistant-StepIndicatorLabel-1')).toHaveText('Review Scanned Values');

    //select values
    await page.locator('#ScanNewContactAssistant-ScanImageResultHeaderGroup-Company').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('VENTECHI INC.').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultHeaderGroup-Name').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('Mike Miller').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultHeaderGroup-JobTitle').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('CEO').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-AddressLine').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('Massachusetts Avenue Northwest').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-State').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('DC').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-County').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('District of Columbia').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-City').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('Washington').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-ZipCode').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('20036').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultAddressGroup-Country').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('United States').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultContactGroup-Phone').getByRole('button', { class: 'picker-button ng-tns-c212-1572 dropdown-mode ng-star-inserted' }).click();
    await page.locator('fnd-lov-entry').getByText('+1-202-782-').click();

    await page.locator('#ScanNewContactAssistant-ScanImageResultContactGroup-Email').getByRole('button', { name: '' }).click();
    await page.locator('fnd-lov-entry').getByText('mike@ventechi.com').click();

    //click 'Launch New Contact Assistant' button
    await page.getByRole('button', { name: 'Launch New Contact Assistant' }).click();

    //verify page name 'New Contact'
    await expect(page.locator('//*[@id="AddContactAssistant"]/div/div/div[1]/div[1]/h1')).toHaveText('New Contact')

    //Turn off New
    await page.locator('#AddContactAssistant-CustomerOrLeadDetailGroup-IsNewCustomerOrLead-booleanFieldComponent div').first().click();
    await page.locator('#AddContactAssistant-CustomerOrLeadDetailGroup-CustomerOrLeadId').getByRole('button', { name: '' }).click();

    //Click find
    await page.getByText('Find').click();
    await expect(page.locator('//*[@id="AddContactAssistant"]/fnd-lov-dialog/fnd-dialog-container/div/div[2]/div[1]/div/h1')).toHaveText('Account/Lead');

    //select the value '100001'
    await page.locator('#filterPane-fndFieldFilter-CustomerId i').click();
    await page.getByPlaceholder('Filter').fill('100001');
    await page.getByPlaceholder('Filter').press('Enter');
    await page.getByTitle('100001').locator('div').first().click();

    //click OK button to add new contact
    await page.getByRole('button', { name: 'OK', exact: true }).click();

    //verify the toast message after click Next
    //await expect(page.locator('role=alert')).toHaveText('Added contact Mike Miller successfully', { timeout: 50000 });



});