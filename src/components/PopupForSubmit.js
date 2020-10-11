import { Popup } from './Popup.js';

export class PopupForSubmit extends Popup {
    constructor (popupSelector, {submitForm}) {
        super (popupSelector);
        this._submitForm = submitForm;
    }

    //переопределяем установщик слушателей, добавляем событие подтверждения формы
    setEventListeners() {
        this.popupSelector.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitForm(this._data);
        });
        super.setEventListeners();
    }
    //переопределяем открытие попапа
    open(data) {
        this._data = data;
        super.open();
    }
}