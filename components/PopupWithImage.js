import { image, title } from "../utils/constants.js";
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
    }
    //переопределяем метод открытия, чтобы заполнить все элементы
    open({image_title, image_link}) {
        this.popupSelector.querySelector(image).src = image_link;
        this.popupSelector.querySelector(title).textContent = image_title;
        this.popupSelector.querySelector(image).alt = `${image_title}. Фото`;
        super.open();
    } 
}