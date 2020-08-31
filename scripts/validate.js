const validationElements = {
                                formSelector: '.popup-form',
                                inputSelector: '.popup-form__text-input',
                                submitButtonSelector: '.popup-form__submit-button',
                                inactiveButtonClass: 'popup-form__submit-button_disabled',
                                inputErrorClass: 'popup-form__text-input_type_error',
                                errorClass: 'popup-form__error-text_show'
}                                                                                                   // Объект с перечислением классов для функции валидации

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorElement, validationMessage, {inputErrorClass, errorClass}) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = validationMessage;
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, errorElement, {inputErrorClass, errorClass}) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// Функция определения валидности ввода
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция изменения активности кнопки отправки формы
const toggleButtonState = (inputList, submitButton, {inactiveButtonClass, ...rest}) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.setAttribute('disabled', '');
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    }
};

// Вызов функций показа/скрытия сообщения об ошибке ввода в зависимости от валидности ввода
const isValid = (formElement, inputElement, {...rest}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        let validationMessage = inputElement.validationMessage;
        // Подменяем стандартный текст ошибки
        if (inputElement.validity.valueMissing) {validationMessage = 'Вы пропустили это поле.'};
        if (inputElement.validity.typeMismatch) {validationMessage = 'Введите адрес сайта.'};
        if (inputElement.validity.tooShort) {validationMessage = `Минимальное число символов - ${inputElement.getAttribute('minlength')}.`};
        showInputError(formElement, inputElement, errorElement, validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, errorElement, rest);
    }
};

// Установка обработчиков элементам ввода
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, submitButton, rest);
            isValid(formElement, inputElement, rest);
        });
    });
};

// Функция ищет все элементы-формы на странице, отменяет стандартное поведение, вызывает функцию установки обработчиков событий
const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    });
};

// Вызов функции с параметром-объектом
enableValidation(validationElements);