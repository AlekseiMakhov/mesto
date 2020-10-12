//раскомментировать для сборки
import './index.css';

import { Card } from '../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../components/Section.js';                                                 //импорт из Section.js
import { PopupWithForm } from '../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../components/UserInfo.js';                                               //импорт из UserInfo.js
import { Api } from '../components/Api.js';                                                         //импорт из Api.js
import { PopupForSubmit } from '../components/PopupForSubmit.js';                                   //импорт из PopupForSubmit.js

const imageAddPopup = document.querySelector('#add-image');                                         //всплывающее окно формы добавления карточки
const avatarEditPopup = document.querySelector('#edit-avatar');                                     //всплывающее окно формы редактирования аватара
const addPlaceButton = document.querySelector('.add-image-button');                                 //кнопка добавления карточки
const cardTempElement = document.querySelector('#place-card').content;                              //элемент с содержимым шаблона для карточки
const imageViewPopup = document.querySelector('#view-image');                                       //всплывающее окно с увеличенным изображением
const profilePopup = document.querySelector('#profile-info__edit');                                 //всплывающее окно формы редактирования профиля
const nameInfo = document.querySelector('.profile-info__name');                                     //инфо профиля "Имя"
const aboutInfo = document.querySelector('.profile-info__description');                             //инфо профиля "О себе"
const nameInput = profilePopup.querySelector('#name-input');                                        //поле ввода имени
const aboutInput = profilePopup.querySelector('#about-input');                                      //поле ввода описания
const editButton = document.querySelector('.profile-info__edit-button');                            //кнопка редактирования профиля
const image = '.popup-image__image';                                                                //селектор картинки
const title = '.popup-image__title';                                                                //селектор названия картинки
const formArray = Array.from(document.querySelectorAll('.popup-form'));                             //массив из всех форм на страниц
const containerSelector = document.querySelector('.elements');                                      //контейнер для карточек
const openedPopupMod = 'popup_opened';                                                              //модификатор открытого попапа
const avatarImg = document.querySelector('.avatar__img');                                           //Аватар (фото)
const avatarEditIcon = document.querySelector('.avatar');                                           //Аватар
const cardDeletePopup = document.querySelector('#delete-card');                                     //всплывающее окно подтверждения удаления карточки




import { validationElements } from '../utils/constants.js';                                         //импорт переменных из constants.js

let userId = '';                                                                                    //переменная для id

const imageView = new PopupWithImage(imageViewPopup, image, title);                                 //создаем экземпляр класса PopupWithImage
imageView.setEventListeners();
//создаем экземпляр класса Api
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

//Функция выводит заданный текст на кнопку формы
function setSavingText(element, text) {
    element.textContent = text;
}
//создаем экземпляр класса PopupWithForm для формы редактирования профиля
const userDataForm = new PopupWithForm(profilePopup, {
    submitForm: (userInfo) => {
        const submitButton = profilePopup.querySelector(validationElements.submitButtonSelector);
        setSavingText(submitButton, 'Сохранеие...');
        api.editProfileInfo(userInfo)
            .then((data) => {
                userInfoObj.nameInfoElement.textContent = data.name;
                userInfoObj.aboutInfoElement.textContent = data.about;
                userDataForm.close();
            })
            .catch(err => console.log(err))
            .finally(setSavingText(submitButton, 'Сохранить'));
    }
});
//при открытии формы редактирования пользователя читаем данные со страницы, заполняем поля ввода формы
const openUserInfoForm = () => {                                           
    nameInput.value = nameInfo.textContent;
    aboutInput.value = aboutInfo.textContent;
    userDataForm.open();
}
userDataForm.setEventListeners();
//Создаем экземпляр класса для редактирования аватара
const avatarEditForm = new PopupWithForm(avatarEditPopup, {
    submitForm: () => {
        const submitButton = profilePopup.querySelector(validationElements.submitButtonSelector);
        setSavingText(submitButton, 'Сохранеие...');
        api.editAvatar(avatarEditPopup.querySelector('#avatar').value)
            .then((data) => {
                userInfoObj.avatarElement.src = data.avatar;
                avatarEditForm.close()
            })
            .catch(err => console.log(err))
            .finally(setSavingText(submitButton, 'Сохранить'));
    }
});
avatarEditForm.setEventListeners();
//Создаем экземпляр класса для подтверждения удаления карточки
const cardDeleteSubmit = new PopupForSubmit(cardDeletePopup, {
    submitForm: (element, item) => {
        api.deleteCard(item._id)
            .then(() => {
                item.removeElement(element);
                cardDeleteSubmit.close();
            })    
            .catch((err) => console.log(err));
    }
});
cardDeleteSubmit.setEventListeners(); 
//функция создания новой карточки
const createCard = (item) => {
    const newCard = new Card(
        {
            data: item,
            handleCardClick: () => imageView.open(item) 
        },
        userId,
        cardTempElement,
       
        (item, element) => { api.setLike(item._id)
            .then((res) => { item.updateLikes(true, element, res.likes)})
            .catch((err) => console.log(err));
        },
        (item, element) => { api.removeLike(item._id)
            .then((res) => { item.updateLikes(false, element, res.likes)})
            .catch((err) => console.log(err))
        },
        (element, item) => cardDeleteSubmit.open(element, item))
    
    return newCard.getView();
}

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
            const submitButton = imageAddPopup.querySelector(validationElements.submitButtonSelector);
            setSavingText(submitButton, 'Создание...');
            api.createNewCard(imageInfo)
                .then((data) => {
                    section.addItem(createCard(data))
                    imageAddForm.close();
                })
                .catch(err => console.log(err))
                .finally(setSavingText(submitButton, 'Создать'));
        }
    }
);
imageAddForm.setEventListeners();  

Promise.all([     
    api.getProfileInfo(),
    api.getInitialCards()
    ])
    .then((values) => {    
        userData.getUserInfo(values[0]);
        userId = values[0]._id;                                                                 //записываем свой id в переменную
        section.renderItems(values[1].reverse());
    })
    .catch((err) => {
        console.log(err);
    });

formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                                //включаем валидацию формы
});
// //устанавливаем слушатели
addPlaceButton.addEventListener('click', () => {imageAddForm.open()});                              //Обработчик события для кнопки добавления карточки
editButton.addEventListener('click', openUserInfoForm);        
avatarEditIcon.addEventListener('click', () => {avatarEditForm.open()});