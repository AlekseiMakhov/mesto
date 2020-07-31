let displayOverlay = document.querySelector('.popup');
let name = document.querySelector('.profile-info__name');
let description = document.querySelector('.profile-info__description');
let editForm = document.querySelector('.profile-edit');
let nameField = document.querySelector('#name');
let descField = document.querySelector('#description');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = document.querySelector('.profile-edit__close-button');
let hiddenFormModifier = 'popup_hidden';


function editProfile () {
    displayOverlay.classList.remove(hiddenFormModifier);
    nameField.value = name.textContent;
    descField.value = description.textContent;
}

function closeForm () {
    displayOverlay.classList.add(hiddenFormModifier);
}

function submitEdit (evt) {
    evt.preventDefault();
    if (nameField.value === '') {
        name.textContent = 'Введите имя';
    } else {
        name.textContent = nameField.value;
    }

    if (description.textContent === '') {
        description.textContent = 'Введите описание';
    } else {
        description.textContent = descField.value;
    }
    closeForm ();
 }

editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', submitEdit);
closeButton.addEventListener('click', closeForm);