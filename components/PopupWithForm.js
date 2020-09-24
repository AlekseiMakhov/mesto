export default class PopupWithForm extends Popup {
    constructor (popupSelector, submitForm) {
        this._popupSelector = popupSelector;
        this._submitForm = submitForm;
    }

    _getInputValues () {
        const formInputValues = {};
        const inputList = Array.from(this._popupSelector.querySelectorAll('popup-form__text-input'));
        inputList.forEach(inputField => {
            formInputValues =+ inputField.value;
        })
        return formInputValues;
    }

    close () {
        const currentForm = this._popupSelector.querySelector('.popup-form');
        currentForm.reset();
        this._popupSelector.classList.remove('opened_popup');
        document.removeEventListener('keydown', this._handleESCclose);
    }

    setEventListeners() {
        const closeButton = this._popupSelector.querySelector(`.${this._popupSelector.firstElementChild.getAttribute('class')}__close-button`);
        closeButton.addEventListener('click', closeButton.close.bind(this.closeButton));

        this._popupSelector.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget) {
                close();
            }
        });

        const submitButton = this._popupSelector.querySelector('.submit__button');
        submitButton.addEventListener('click', this._submitForm);
    }
}