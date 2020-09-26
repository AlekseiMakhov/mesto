import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, {submitForm}) {
        super (popupSelector);
        this._submitForm = submitForm;
        this._currentForm = this.popupSelector.querySelector('.popup-form');
    }
    //эта функция собирает в объект данные полей формы
    _getInputValues() {
        this._formInputValues = {};
        this._inputList = Array.from(this._popupSelector.querySelectorAll('popup-form__text-input'));
        this._inputList.forEach(inputField => {
            this._formInputValues[inputField.name] = inputField.value;
        })
        return this._formInputValues;
    }
    //переопределяем закрытие, добавляем сброс полей формы
    close() {
        this._currentForm.reset();
        super.close();
    }
    //переопределяем установщик слушателей, добавляем событие подтверждения формы
    setEventListeners(evt) {
        evt.preventDefault();
        this._currentForm.addEventListener('submit', () => {this._submitForm(this._getInputValues())});
        super.setEventListeners();
    }
}