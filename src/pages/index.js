import './index.css';

import { Card } from '../../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../../components/Section.js';                                                 //импорт из Section.js
import { PopupWithForm } from '../../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../../components/UserInfo.js';                                               //импорт из UserInfo.js

import {
    initialCards, 
    validationElements,
    imageAddPopup,
    imageNameInput,
    imageLinkInput,
    addPlaceButton,
    cardTempElement,
    imageViewPopup,
    profilePopup,
    nameInput,
    aboutInput,
    editButton,
    formArray,
    containerSelector
} from '../utils/constants.js';                                                                     //импорт переменных из constants.js

const userData = new UserInfo({nameFieldSelector: nameInput, aboutFieldSelector: aboutInput});
const imageView = new PopupWithImage(imageViewPopup);
imageView.setEventListeners();
const section = new Section(
    {items: initialCards, 
    renderer: (item) => {
        const newCard = new Card(
            {name: item.name,
            link: item.link,
            handleCardClick: () => imageView.open({image_title: item.name, image_link: item.link})},
            cardTempElement);
        const card = newCard.getView();
        section.addItem(card);
        }
    },
    containerSelector
);

const imageAddForm = new PopupWithForm(imageAddPopup, 
    {submitForm: evt => {
        evt.preventDefault();  
        const newCard = new Card(
            {name: imageNameInput.value, 
            link: imageLinkInput.value,
            handleCardClick: (evt) => imageView.open(
                {image_title: evt.target.parentElement.querySelector('.element__text').textContent, 
                image_link: evt.target.src})
            },
            cardTempElement);
        const card = newCard.getView();;   //создаем новый элемент-карточку
        section.addItem(card);
        imageAddForm.close();
    }
});

const userDataForm = new PopupWithForm(profilePopup, 
    {submitForm: evt => {   //
        evt.preventDefault();                                                                                                               //отменяем стандартное действие
        userData.setUserInfo();
        userDataForm.close();
    }
});

const openUserInfo = () => {
    userDataForm.open();
    userData.getUserInfo();
}

section.renderItems();
imageAddForm.setEventListeners();
userDataForm.setEventListeners();
imageView.setEventListeners();

formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                    //включаем валидацию формы
});

addPlaceButton.addEventListener('click', () => {imageAddForm.open()});                  //Обработчик события для кнопки добавления карточки
editButton.addEventListener('click', openUserInfo);        