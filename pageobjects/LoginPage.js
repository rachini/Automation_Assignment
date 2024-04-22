class LoginPage {

    constructor(page) {

        this.page = page;
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
        this.signInbutton = page.locator("[value='Log in']");

    }

    async gotoLoginPage() {
        await this.page.goto('https://topo-d02.build.ifsdemoworld.com/auth/realms/topod021/protocol/openid-connect/auth?scope=openid%20microprofile-jwt&client_id=IFS_aurena&nonce=4871d36a2ec419e6c4a666942cd87344&response_type=code&redirect_uri=https%3A%2F%2Ftopo-d02.build.ifsdemoworld.com%2Fredirect&state=44a2cbcf6f2785f32bd378d476066a5e');

    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();

    }

    async invalidLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();

    }

}

module.exports = { LoginPage };