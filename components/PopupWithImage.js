import { image, title } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        const elementTitle = this.parentElement.querySelector('.element__text');
        this._popupSelector.querySelector(image).src = this.src;
        this._popupSelector.querySelector(title).textContent = elementTitle.textContent;
        this._popupSelector.querySelector(image).alt = `${elementTitle.textContent}. Фото`;
    } 
}