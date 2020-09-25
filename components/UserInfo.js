import { nameInfo, aboutInfo } from '../utils/constants.js';

export class UserInfo {

    constructor ( {nameFieldSelector, aboutFieldSelector} ) {
        this._nameFieldSelector = nameFieldSelector;
        this._aboutFieldSelector = aboutFieldSelector;
    }

    getUserInfo() {
        this._nameFieldSelector.value = nameInfo.textContent;
        this._aboutFieldSelector.value = aboutInfo.textContent;
    }

    setUserInfo() {
        nameInfo.textContent = this._nameFieldSelector.value;
        aboutInfo.textContent = this._aboutFieldSelector.value;
    }
}