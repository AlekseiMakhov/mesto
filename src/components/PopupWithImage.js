import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector, imageSelector, titleSelector) {
        super (popupSelector),
        this._image = this.popupSelector.querySelector(imageSelector),
        this._title = this.popupSelector.querySelector(titleSelector)
    }
    //переопределяем метод открытия, чтобы передать значения элементам попапа
    open(data) {
        this._image.src = data.link;
        this._title.textContent = data.name;
        this._image.alt = `${data.name}. Фото`;
        super.open();
    } 
}