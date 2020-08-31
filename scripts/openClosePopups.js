const openedPopupModifier = 'popup_opened'; // Модификатор открытого попапа

// Удаление модификатора (вынес в отдельную функцию, т.к. несколько раз вызывается)
const removePopupModifier = popupElement => {
    popupElement.classList.remove(openedPopupModifier);
}

// Удаление обработчика Escape, 
const removeEscapeListener = element => {
    document.removeEventListener('keydown', evt => {
        if (evt.key === "Escape") {
            removePopupModifier(element);
        }
    });
}

// Закрываем попап, удаляем обработчик Escape
const closePopup = popupElement => {
    removePopupModifier(popupElement);
    removeEscapeListener(popupElement);
}

// Функция установки обработчиков событий для открытого окна
const setListeners = (popupElement) => {
    const closeButton = popupElement.querySelector(`.${popupElement.firstElementChild.getAttribute('class')}__close-button`);
    
    // Установка обработчика на кнопку закрытия
    closeButton.addEventListener('click', evt => {
        closePopup(popupElement);
    });

    // Установка обработчика по "отлову" кнопки Escape
    popupElement.addEventListener('keydown', evt => {
        if  (evt.key === "Escape") {
            closePopup(popupElement);
        }
    });

    // Установка обработчика по клику на оверлее
    popupElement.addEventListener('click', evt => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupElement);
        }
    });    
}

// Установка обработчика Escape
const addEscapeListener = element => {
    document.addEventListener('keydown', evt => {
        if (evt.key === "Escape") {
            removePopupModifier(element);
        }
    });
}

// Открываем нужный попап, который передаем аргументом popupElement
const openPopup = (popupElement) => {
    popupElement.classList.add(openedPopupModifier); //Добавляем ему модификатор
    setListeners(popupElement); // Устанавливаем обработчики
    addEscapeListener(popupElement); //Устанавливаем обработчик нажатия Escape отдельно
}