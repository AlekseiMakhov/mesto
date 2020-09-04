const openedPopupModifier = 'popup_opened'; // Модификатор открытого попапа
const popup = document.querySelector('.popup');
const aboutButton = document.querySelector('#about');
const closeButton = popup.querySelector('.about__close-button');

// Удаление модификатора
const removePopupModifier = () => {
    popup.classList.remove(openedPopupModifier);
}

// Закрываем попап, удаляем обработчик Escape
function closePopup() {
    removePopupModifier();
    document.removeEventListener('keydown' , handleESCclose);
}

// Обработка нажатия Escape
function handleESCclose(evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
}

// Установка обработчика на кнопку закрытия
closeButton.addEventListener('click', closePopup);

// Установка обработчика по клику на оверлее
popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
        closePopup();
    }
});


// Открываем нужный попап, который передаем аргументом popupElement
const openPopup = () => {
    popup.classList.add(openedPopupModifier); //Добавляем ему модификатор
    document.addEventListener('keydown' , handleESCclose); //добавляем открытому оену обработчик Escape
}

aboutButton.addEventListener('click', evt => {
    evt.preventDefault();
    openPopup();
});