const openedPopupModifier = 'popup_opened'; // Модификатор открытого попапа
const popupArray = Array.from(document.querySelectorAll('.popup')); //массив из всех попапов на странице

// Удаление модификатора
const removePopupModifier = (openedPopup) => {
    openedPopup.classList.remove(openedPopupModifier);
}

// Обработка нажатия Escape
function handleESCclose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened'); //находим открытый попап
        removePopupModifier(openedPopup);
    }
}

// Закрываем попап, удаляем обработчик Escape
const closePopup = popupElement => {
    removePopupModifier(popupElement);
    document.removeEventListener('keydown' , handleESCclose);
}

// Устанавливаем обработчики событий на все попапы 
popupArray.forEach((popupElement) => {
    const closeButton = popupElement.querySelector(`.${popupElement.firstElementChild.getAttribute('class')}__close-button`);
    
    // Установка обработчика на кнопку закрытия
    closeButton.addEventListener('click', evt => {
        closePopup(popupElement);
    });

    // Установка обработчика по клику на оверлее
    popupElement.addEventListener('click', evt => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupElement);
        }
    });
});

// Открываем нужный попап, который передаем аргументом popupElement
const openPopup = (popupElement) => {
    popupElement.classList.add(openedPopupModifier); //Добавляем ему модификатор
    document.addEventListener('keydown' , handleESCclose); //добавляем открытому оену обработчик Escape
}