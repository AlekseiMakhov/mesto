const displayOverlay = document.querySelector('#profile');
const name = document.querySelector('.profile-info__name');
const description = document.querySelector('.profile-info__description');
const editForm = displayOverlay.querySelector('.popup-form');
const nameField = displayOverlay.querySelector('#text1');
const descField = displayOverlay.querySelector('#text2');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = displayOverlay.querySelector('.popup-form__close-button');

toggleInputFormDisplay = () => {
    displayOverlay.classList.toggle('popup_opened');
}

editProfile = () => {
    toggleInputFormDisplay();
    nameField.value = name.textContent;
    descField.value = description.textContent;
}

submitEditing = evt => {
    evt.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descField.value;
    toggleInputFormDisplay();
 }

editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', submitEditing);
closeButton.addEventListener('click', toggleInputFormDisplay);
