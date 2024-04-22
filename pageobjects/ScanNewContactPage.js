class ScanNewContactPage {

    constructor(page) {

        this.page = page;
        this.browse = page.locator(".icon-account-type");
        this.save = page.locator(".icon-save");
        this.next = page.locator("[id=ScanNewContactAssistant-fndToolbar-action-Next-fndButton-button]");

    }



    async uploadImage() {

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.browse.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('/Users/admin/Downloads/BC002.png');
    }

    async saveButton() {

        await this.save.click();
    }

    async nextButton() {

        await this.next.click();
    }


}

module.exports = { ScanNewContactPage };