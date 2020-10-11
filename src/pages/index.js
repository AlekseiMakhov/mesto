//import './index.css';

import { Card } from '../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../components/Section.js';                                                 //импорт из Section.js
import { PopupWithForm } from '../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../components/UserInfo.js';                                               //импорт из UserInfo.js
import { Api } from '../components/Api.js';                                                         //импорт из Api.js
import { Popup } from '../components/Popup.js';                                                         //импорт из Popup.js

import {
    validationElements,
    imageAddPopup,
    addPlaceButton,
    cardTempElement,
    imageViewPopup,
    profilePopup,
    nameInfo,
    aboutInfo,
    editButton,
    formArray,
    containerSelector,
    image,
    title,
    nameInput,
    aboutInput,
    avatarEditIcon,
    avatarEditPopup,
    avatarImg,
    cardDeletePopup,
    cardDeleteForm
} from '../utils/constants.js';                                                                     //импорт переменных из constants.js

const imageView = new PopupWithImage(imageViewPopup, image, title);                                 //создаем экземпляр класса PopupWithImage

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '83172f60-a4ab-4f2a-9396-1325bbd21612',
        'Content-Type': 'application/json'
    }
})

const userInfoObj = {
    nameInfoElement: nameInfo,
    aboutInfoElement: aboutInfo,
    avatarElement: avatarImg
}

const userData = new UserInfo(userInfoObj);                                                         //создаем экземпляр класса UserInfo

//получение информации о пользователе с сервера
function getInfo() {
    api.getProfileInfo()
        .then((res) => {
            userData.getUserInfo(res);
        })
        .catch((err) => {console.log(err)});
}

getInfo();                                                                                          

function saving(element, text) {
    element.textContent = text;
}

//создаем экземпляр класса PopupWithForm для формы редактирования профиля
const userDataForm = new PopupWithForm(profilePopup, {
    submitForm: (userInfo) => {
        const submitButton = profilePopup.querySelector(validationElements.submitButtonSelector);
        saving(submitButton, 'Сохранеие...');
        api.editProfileInfo(userInfo.name, userInfo.about)
        .then()
        .catch((err) => {console.log(err)})
        .finally(saving(submitButton, 'Сохранить'));
        getInfo();
        userDataForm.close();
    }
});

//при открытии формы редактирования пользователя читаем данные со страницы, заполняем поля ввода формы
const openUserInfoForm = () => {                                           
    nameInput.value = nameInfo.textContent;
    aboutInput.value = aboutInfo.textContent;
    userDataForm.open();
}
userDataForm.setEventListeners();

const avatarEditForm = new PopupWithForm(avatarEditPopup, {
    submitForm: () => {
        const submitButton = profilePopup.querySelector(validationElements.submitButtonSelector);
        saving(submitButton, 'Сохранеие...');
        api.editAvatar(avatarEditPopup.querySelector('#avatar').value)
        .then()
        .catch((err) => {console.log(err)})
        .finally(saving(submitButton, 'Сохранить'));
        getInfo();
        avatarEditForm.close();
    }
});
avatarEditForm.setEventListeners();

const cardDeleteSubmit = new Popup(cardDeletePopup);

cardDeleteSubmit.setEventListeners();

cardDeleteSubmit.submitDelete = (cardId) => { 
    cardDeleteSubmit.open();
    cardDeleteForm.addEventListener('submit', evt => {
        evt.preventDefault();
        document.getElementById(cardId).remove();
        api.deleteCard(cardId);
        cardDeleteSubmit.close();
    });
}    

//функция создания новой карточки
const createCard = (item) => {
    const newCard = new Card(
        {
            data: item,
            handleCardClick: () => imageView.open(item)
        },
        cardTempElement,
        () => api.setLike(item._id),
        () => api.removeLike(item._id),
        () => cardDeleteSubmit.submitDelete(item._id)
    );
    return newCard.getView();
}

api.getInitialCards()
    .then((items) => {
        section.renderItems(items)
    })
    .catch((err) => {
        console.log(err)
    });

//создаем экземпляр класса Section
const section = new Section(
    {  
        renderer: (item) => {
            section.addItem(createCard(item));
        }
    },
    containerSelector
); 

//создаем экземпляр класса PopupWithForm для формы добавления карточки
const imageAddForm = new PopupWithForm(imageAddPopup,
    {
        submitForm: (imageInfo) => {
            api.createNewCard(imageInfo)
                .then((data) => {
                    section.addItem(createCard(data))
                })
                .catch((err) => {
                    console.log(err)
                });
            imageAddForm.close();
        }
    }
);

// //устанавливаем слушатели
imageAddForm.setEventListeners();                                                       

imageView.setEventListeners();

formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                                //включаем валидацию формы
});

addPlaceButton.addEventListener('click', () => {imageAddForm.open()});                              //Обработчик события для кнопки добавления карточки
editButton.addEventListener('click', openUserInfoForm);        
avatarEditIcon.addEventListener('click', () => {avatarEditForm.open()});