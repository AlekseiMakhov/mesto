export default class UserInfo {
    constructor ( {nameFielsSelector, aboutFieldSelector} ) {
        this._nameFielsSelector = nameFielsSelector;
        this._aboutFieldSelector = aboutFieldSelector;
    }

    getUserInfo ( name, about ) {
        name = this._nameFielsSelector.textContent;
        about = this._aboutFieldSelector.textContent;
    }

    setUserInfo ( name, about, nameText, aboutText ) {
        nameText.textContent = name;
        aboutText.textContent = about;
    }
}