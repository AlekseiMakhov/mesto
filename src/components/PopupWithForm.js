import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, {submitForm}) {
        super (popupSelector);
        this._submitForm = submitForm;
        this._currentForm = this.popupSelector.querySelector('.popup-form');
        this._submitButton = this.popupSelector.querySelector('.popup-form__submit-button');
    }
    //эта функция собирает в объект данные полей формы
    _getInputValues() {
        this._formInputValues = {};
        this._inputList = Array.from(this.popupSelector.querySelectorAll('.popup-form__text-input'));
        this._inputList.forEach(inputField => {
            this._formInputValues[inputField.name] = inputField.value;
        })
        return this._formInputValues;
    }
    //переопределяем закрытие, добавляем сброс полей формы, делаем кнопку неактивной
    close() {
        this._currentForm.reset();
        this._submitButton.classList.add('popup-form__submit-button_disabled');
        this._submitButton.setAttribute('disabled', '');
        super.close();
    }
    //переопределяем установщик слушателей, добавляем событие подтверждения формы
    setEventListeners() {
        this._currentForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());

        });
        super.setEventListeners();
    }
}