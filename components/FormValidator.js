export class FormValidator {
    constructor(validationElements, formElement) {

        this._inputSelector = validationElements.inputSelector;
        this._submitButtonSelector = validationElements.submitButtonSelector;
        this._inactiveButtonClass = validationElements.inactiveButtonClass;
        this._inputErrorClass = validationElements.inputErrorClass;
        this._errorClass = validationElements.errorClass;
        this._formElement = formElement;
    }

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (inputElement, errorElement, validationMessage) => {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = validationMessage;
    };
    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (inputElement, errorElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    // Функция определения валидности ввода
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    // Функция изменения активности кнопки отправки формы
    _toggleButtonState = (inputList, submitButton) => {
        if (this._hasInvalidInput(inputList)) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.setAttribute('disabled', '');
        } else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        }
    };
    // Вызов функций показа/скрытия сообщения об ошибке ввода в зависимости от валидности ввода
    _isValid = (inputElement) => {
        const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement, inputElement.validationMessage);
            } else {
            this._hideInputError(inputElement, errorElement);
        }
    };
    // Установка обработчиков элементам ввода
    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, submitButton);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(inputList, submitButton);
                this._isValid(inputElement); 
            });
        });
    };
    
    // Функция отменяет стандартное поведение, вызывает функцию установки обработчиков событий
    enableValidation = () => {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault(); 
        });
        this._setEventListeners();
    }
}