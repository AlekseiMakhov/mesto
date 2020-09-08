export class FormValidator {
    constuctor(validationElements, formElement) {} 

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (inputElement, errorElement, validationMessage, {inputErrorClass, errorClass}) => {
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = validationMessage;
    };
    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (inputElement, errorElement, {inputErrorClass, errorClass}) => {
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };
    // Функция определения валидности ввода
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    // Функция изменения активности кнопки отправки формы
    _toggleButtonState = (inputList, submitButton, {inactiveButtonClass}) => {
        if (this._hasInvalidInput(inputList)) {
            submitButton.classList.add(inactiveButtonClass);
            submitButton.setAttribute('disabled', '');
        } else {
            submitButton.classList.remove(inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        }
    };
    // Вызов функций показа/скрытия сообщения об ошибке ввода в зависимости от валидности ввода
    _isValid = (inputElement, {...rest}) => {
        const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement, inputElement.validationMessage, rest);
            } else {
            this._hideInputError(inputElement, errorElement, rest);
        }
    };
    // Установка обработчиков элементам ввода
    _setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const submitButton = formElement.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, submitButton, rest);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._toggleButtonState(inputList, submitButton, rest);
            this._isValid(inputElement, rest);
            
            });
        });
    };
    
    // Функция отменяет стандартное поведение, вызывает функцию установки обработчиков событий
    enableValidation = (formElement, validationElements) => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners(formElement, validationElements);
        
    }
}