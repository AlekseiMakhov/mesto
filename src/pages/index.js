//import './index.css';

import { Card } from '../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../components/Section.js';                                                 //импорт из Section.js
import { PopupWithForm } from '../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../components/UserInfo.js';                                               //импорт из UserInfo.js

import {
    initialCards, 
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
    aboutInput
} from '../utils/constants.js';                                                                     //импорт переменных из constants.js

const userData = new UserInfo(nameInfo, aboutInfo);                                                 //создаем экземпляр класса UserInfo
const imageView = new PopupWithImage(imageViewPopup, image, title);                                 //создаем экземпляр класса PopupWithImage

//функция создания новой карточки
const createCard = (data) => {
    const newCard = new Card(
        {
            name: data.name,
            link: data.link,
            handleCardClick: () => imageView.open(data)
        },
        cardTempElement);
    return newCard.getView();
}

//создаем экземпляр класса Section
const section = new Section(
    {
        items: initialCards, 
        renderer: item => section.addItem(createCard(item))
    },
    containerSelector
);

//создаем экземпляр класса PopupWithForm для формы добавления карточки
const imageAddForm = new PopupWithForm(imageAddPopup,
    {
        submitForm: imageInfo => {
            section.addItem(createCard(imageInfo));
            imageAddForm.close();
        }
    }
);

//создаем экземпляр класса PopupWithForm для формы редактирования профиля
const userDataForm = new PopupWithForm(profilePopup,
    {submitForm: (userInfo) => {
        userData.setUserInfo(userInfo);
        userDataForm.close();
    }
});

//при открытии формы редактирования пользователя читаем данные со страницы, заполняем поля ввода формы
const openUserInfo = () => {
    const userInfo = userData.getUserInfo();                                            
    nameInput.value = userInfo.name;
    aboutInput.value = userInfo.about;
    userDataForm.open();
}

section.renderItems();                                                                              //вызов отрисовки карточек на странице
//устанавливаем слушатели
imageAddForm.setEventListeners();                                                       
userDataForm.setEventListeners();
imageView.setEventListeners();

formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                                //включаем валидацию формы
});

addPlaceButton.addEventListener('click', () => {imageAddForm.open()});                              //Обработчик события для кнопки добавления карточки
editButton.addEventListener('click', openUserInfo);        