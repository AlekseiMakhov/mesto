let name = document.querySelector('.profile-info__name').textContent;
let description = document.querySelector('.profile-info__description').textContent;
let displayForm = document.querySelector('.profile-edit__overlay');
let nameField = document.querySelector('#name');
let descField = document.querySelector('#description');
let editButton = document.querySelector('.profile-info__edit-button');
let submitButton = document.querySelector('.profile-edit__submit-button');
let closeButton = document.querySelector('.profile-edit__close-button');
let hiddenFormModifier = 'profile-edit__overlay_hidden';


function editProfile() {

    displayForm.classList.remove(hiddenFormModifier);
    nameField.setAttribute('value', name);
    descField.setAttribute('value', description);
}

function closeForm() {
    displayForm.classList.add(hiddenFormModifier);
}

function submitEdit() {
    name = nameField.value;
    if (name === '') {
        name = 'Введите имя';
    }
    description = descField.value;
    if (description === '') {
        description = 'Введите описание';
    }
    document.querySelector('.profile-info__name').textContent = name;
    document.querySelector('.profile-info__description').textContent = description;

    closeForm();
}

editButton.addEventListener('click', editProfile);
submitButton.addEventListener('click', submitEdit);
closeButton.addEventListener('click', closeForm);

