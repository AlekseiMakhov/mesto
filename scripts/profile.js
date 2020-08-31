const displayOverlay = document.querySelector('#profile-info__edit'); //всплывающее окно формы редактирования профиля
const name = document.querySelector('.profile-info__name'); //имя
const about = document.querySelector('.profile-info__description'); //описание (профессия)
const editForm = displayOverlay.querySelector('.popup-form'); //форма редактирования профиля
const nameField = displayOverlay.querySelector('#name-input'); //поле ввода имени
const aboutField = displayOverlay.querySelector('#about-input'); //поле ввода описания
const editButton = document.querySelector('.profile-info__edit-button'); //кнопка редактирования профиля

//функция редактирования профиля
const editProfile = () => {
    openPopup(displayOverlay);
    nameField.value = name.textContent;
    aboutField.value = about.textContent;
}

//функция отправки формы редактирования профиля
const submitEditing = evt => {
    evt.preventDefault();
    name.textContent = nameField.value;
    about.textContent = aboutField.value;
    closePopup(displayOverlay);
 }

editButton.addEventListener('click', editProfile); //обработчик события кнопки редактирования профиля
editForm.addEventListener('submit', submitEditing); //обработчик события для отправки формы редактирования профиля