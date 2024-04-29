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
        this.text2=page.locator("[id='ScanNewContactAssistant-StepIndicatorLabel-1']");
        this.toast2=page.locator('[role="alert"]');
      
    }

    async gotoScanPage() {
        await this.page.goto('https://topo-d02.build.ifsdemoworld.com/main/ifsapplications/web/assistant/ScanNewContact/ScanNewContactAssistant;path=0.279000411.615228976.1142250054.1092084979');

    }

    async getH4Text() {
        const h4Text = await this.text1;
        return h4Text.textContent;
    }


    async uploadImage() {

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.browse.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('/Users/admin/Downloads/BC002.png');
    }

    async invalidUpload() {

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.browse.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('/Users/admin/Downloads/selenium-java-4.16.1/lib/opentelemetry-semconv-1.28.0-alpha.jar');
    }

    async invalidUploadToastMessage() {
        const alertElement = await this.toast2;
        return alertElement.textContent;
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
        return alertElement.textContent;
    }

    async getH4Text2() {
        const h4Text = await this.text2;
        return h4Text.textContent;

    }

    async launchButton() {

        await this.launch.click();

    }




}

module.exports = { ScanNewContactPage };