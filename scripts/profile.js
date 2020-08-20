const displayOverlay = document.querySelector('#profile'); //всплывающее окно формы редактирования профиля
const name = document.querySelector('.profile-info__name'); //имя
const description = document.querySelector('.profile-info__description'); //описание (профессия)
const editForm = displayOverlay.querySelector('.popup-form'); //форма редактирования профиля
const nameField = displayOverlay.querySelector('#profile-name'); //поле ввода имени
const descField = displayOverlay.querySelector('#profile-description'); //поле ввода описания
const editButton = document.querySelector('.profile-info__edit-button'); //кнопка редактирования профиля
const closeButton = displayOverlay.querySelector('.popup-form__close-button'); //кнопка закрытия окна

//функция открытия/скрытия окна редактирования профиля
const toggleInputFormDisplay = () => {
    displayOverlay.classList.toggle('popup_opened');
}

//функция редактирования профиля
const editProfile = () => {
    toggleInputFormDisplay();
    nameField.value = name.textContent;
    descField.value = description.textContent;
}

//функция отправки формы редактирования профиля
const submitEditing = evt => {
    evt.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descField.value;
    toggleInputFormDisplay();
 }

editButton.addEventListener('click', editProfile); //обработчик события кнопки редактирования профиля
editForm.addEventListener('submit', submitEditing); //обработчик события для отправки формы редактирования профиля
closeButton.addEventListener('click', toggleInputFormDisplay); //обработчик события кнопки закрытия окна