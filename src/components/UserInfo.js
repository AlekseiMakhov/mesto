export class UserInfo {

    constructor (nameInfoElement, aboutInfoElement) {
        this._nameInfoElement = nameInfoElement;
        this._aboutInfoElement = aboutInfoElement;
    }

    getUserInfo() {
        this._userData = {};
        this._userData.name = this._nameInfoElement.textContent;
        this._userData.about = this._aboutInfoElement.textContent;
        return this._userData;
    }

    setUserInfo({ userData }) {
        this._nameInfoElement.textContent = userData.name;
        this._aboutInfoElement.textContent = userData.about;
    }
}