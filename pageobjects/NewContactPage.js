class NewContactPage {

    constructor(page) {

        this.page = page;
        this.bar = page.locator('//*[@id="AddContactAssistant-CustomerOrLeadDetailGroup-IsNewCustomerOrLead-booleanFieldComponent"]/granite-toggle-switch/label/div');
        this.arrow = page.locator('#AddContactAssistant-CustomerOrLeadDetailGroup-CustomerOrLeadId');
        this.text3 = page.locator('//*[@id="AddContactAssistant"]/div/div/div[1]/div[1]/h1');
        this.ok = page.locator(".granite-button-base granite-button-wrapper granite-button ng-star-inserted");

    }

    async pageText() {
        const text = await this.text3;
        return text.textContent;

    }

    async uncheckToggleButton() {
        const toggleButton = await this.bar;
        const isChecked = await toggleButton.isChecked();

        if (isChecked) {
            await toggleButton.click();
        }
    }

    async clickArrow() {
        await this.arrow.getByRole('button', { name: '' }).click();


    }


    async clickByText(text) {
        await this.page.waitForSelector(`text=${text}`);
        const element = await this.page.$(`text=${text}`);
        if (element) {
            await element.click();
        } else {
            throw new Error(`Element with text '${text}' not found`);
        }
    }

    async clickElement(selector) {
        const element = await this.page.$(selector);//find the first element that matches the given CSS selector.
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found`);
        }
        await element.click();
    }

    async clickElementByPlaceholder(placeholder) {
        // Use page.evaluate to execute JavaScript in the context of the page
        await this.page.evaluate((placeholder) => {
            // Find the element by placeholder
            const element = document.querySelector(`[placeholder="${placeholder}"]`);
            // If element found, click on it
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with placeholder "${placeholder}" not found`);
            }
        }, placeholder);
    }

    async fillInputByPlaceholder(placeholder, value) {
        await this.page.evaluate(({ placeholder, value }) => {//passes an object containing the placeholder and value variables into the evaluated function
            // Find the input element by placeholder
            const input = document.querySelector(`[placeholder="${placeholder}"]`);//selects the input element on the page with the specified placeholder attribute
            // If input found, fill it with the specified value
            if (input) {
                input.value = value;
                // Dispatch an 'input' event to trigger any associated events
                input.dispatchEvent(new Event('input', { bubbles: true }));//dispatches an event on the input element
            } else {
                throw new Error(`Input with placeholder "${placeholder}" not found`);
            }
        }, { placeholder, value });
    }

    async pressEnterOnElementByPlaceholder(placeholder) {
        await this.page.evaluate((placeholder) => {
            const input = document.querySelector(`[placeholder="${placeholder}"]`);//Within the evaluated function, search for an input element with the specified placeholder attribute 
            if (input) {
                // Dispatch a keydown event with the "Enter" key
                const event = new KeyboardEvent('keydown', {//line creates a new KeyboardEvent 
                    key: 'Enter',
                    keyCode: 13,
                    bubbles: true,
                    cancelable: true,
                });
                input.dispatchEvent(event);
            } else {
                throw new Error(`Input with placeholder "${placeholder}" not found`);
            }
        }, placeholder);
    }

    async clickElementByIdAndText(id, text) {
        const selector = `#${id}`;//constructs a CSS selector by combining the ID with # to target the element with the specified ID.
        await this.page.waitForSelector(selector); // Wait for the element to appear
        await this.page.evaluate(({ selector, text }) => {//passes an object containing the selector and text variables into the evaluated function
            const elements = document.querySelectorAll(selector);// selects all elements on the page that match the provided selector.
            for (const element of elements) {//iterates over each matching element.
                if (element.textContent.trim() === text) {//text content of the current element (trimmed to remove leading and trailing whitespace) matches the provided text
                    element.click();
                    break; // Stop iterating after clicking the first matching element
                }
            }
        }, { selector, text });
    }


    async clickOkButton() {
        await this.ok.click();
    }






}

module.exports = { NewContactPage };