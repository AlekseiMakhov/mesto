import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector, imageSelector, titleSelector) {
        super (popupSelector),
        this._image = this.popupSelector.querySelector(imageSelector);
        this._title = this.popupSelector.querySelector(titleSelector)
    }
    //переопределяем метод открытия, чтобы заполнить все элементы
    open({imageLink, imageTitle}) {
        this._image.src = imageLink;
        this._title.textContent = imageTitle;
        this._image.alt = `${imageTitle}. Фото`;
        super.open();
    } 
}