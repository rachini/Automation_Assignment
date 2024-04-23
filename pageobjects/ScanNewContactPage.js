class ScanNewContactPage {

    constructor(page) {

        this.page = page;
        this.browse = page.locator(".icon-account-type");
        this.save = page.locator(".icon-save");
        this.delete=page.locator(".icon-delete");
        this.next = page.locator("[id='ScanNewContactAssistant-fndToolbar-action-Next-fndButton-button']");
        this.launch = page.locator("[id='ScanNewContactAssistant-fndToolbar-action-LaunchNew Contact Assistant-fndButton-button']");
        this.text1=page.locator('//*[@id="ScanNewContactAssistant-StepIndicatorLabel-0"]');
        this.saveText = page.locator('div').filter({ hasText: /^Save$/ });
        this.deleteText = page.locator('div').filter({ hasText: /^Delete$/ });
        this.toast=page.locator('[role="alert"]');
        this.text2=page.locator('id=ScanNewContactAssistant-StepIndicatorLabel-1');
      
    }

    async navigateToUrl(url) {
        await this.page.goto(url);
    }

    async getH4Text() {
        const h4Text = await this.text1;
        return h4Text.textContent();
    }


    async uploadImage() {

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.browse.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('/Users/admin/Downloads/BC002.png');
    }

    async isSaveButtonEnabled() {
        const saveButton = await this.save;
        return await saveButton.isEnabled();
    }

    async getSaveButtonText() {
        const saveButton = await this.saveText;
        return saveButton.textContent();
    }

    async saveButton() {

        await this.save.click();
    }

    async isDeleteButtonEnabled() {
        const deleteButton = await this.delete;
        return await deleteButton.isEnabled();
    }

    async getDeleteButtonText() {
        const deleteButton = await this.deleteText;
        return deleteButton.textContent();
    }

    async nextButton() {

        await this.next.click();
    }

    async toastMessageText() {
        const alertElement = await this.toast;
        return alertElement.textContent();
    }

    async getH4Text2() {
        const h4Text = await this.text2;
        return h4Text.textContent();

    }

    async launchButton() {

        await this.launch.click();

    }




}

module.exports = { ScanNewContactPage };