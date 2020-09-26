import './index.css';

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

//создаем экземпляр класса Section
const section = new Section(
    {items: initialCards, 
    renderer: item => {
        const newCard = new Card(
            {name: item.name,
            link: item.link,
            handleCardClick: () => imageView.open(item)},
            cardTempElement);
        const card = newCard.getView();
        section.addItem(card);
        }
    },
    containerSelector
);

//создаем экземпляр класса PopupWithForm для формы добавления карточки
const imageAddForm = new PopupWithForm(imageAddPopup,
    {submitForm: (imageInfo) => {
        const newCard = new Card(
            {name: imageInfo.name, 
            link: imageInfo.link,
            handleCardClick: () => imageView.open(imageInfo)},
            cardTempElement);
        const card = newCard.getView();;   //создаем новый элемент-карточку
        section.addItem(card);
        imageAddForm.close();
    }
});

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