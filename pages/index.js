import { initialCards, validationElements } from '../utils/constants.js';                           //импорт из constants.js
import { Card } from '../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../components/Section.js';                                                 //импорт из Section.js
import { Popup } from '../components/Popup.js';                                                     //импорт из Popup.js
import { PopupWithForm } from '../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../components/UserInfo.js';                                               //импорт из UserInfo.js

const imageAddPopup = document.querySelector('#add-image');                             //всплывающее окно формы добавления карточки
const addForm = imageAddPopup.querySelector('.popup-form');                             //форма добаления карточки
const submitAddImageButton = addForm.querySelector('.popup-form__submit-button');       //поле ввода названия карточки
const imageNameInput = addForm.querySelector('#image-input');                           //поле ввода названия карточки
const imageLinkInput = addForm.querySelector('#link-input');                            //поле ввода ссылки
const addPlaceButton = document.querySelector('.add-image-button');                     //кнопка добавления карточки
const cardTempElement = document.querySelector('#place-card').content;                  //элемент с содержимым шаблона для карточки
const imageViewPopup = document.querySelector('#view-image');                           //всплывающее окно с увеличенным изображением
const imageViewElement = imageViewPopup.querySelector('.popup-image__image');           //увеличенное изображение
const imageViewTitle = imageViewPopup.querySelector('.popup-image__title');             //подпись с названием
const cardElements = document.querySelector('.elements');                               //объект (секция с карточками)
const profilePopup = document.querySelector('#profile-info__edit');                     //всплывающее окно формы редактирования профиля
const name = document.querySelector('.profile-info__name');                             //поле ввода "Имя"
const about = document.querySelector('.profile-info__description');                     //поле ввода "О себе"
const editForm = profilePopup.querySelector('.popup-form');                             //форма редактирования профиля
const nameField = profilePopup.querySelector('#name-input');                            //поле ввода имени
const aboutField = profilePopup.querySelector('#about-input');                          //поле ввода описания
const editButton = document.querySelector('.profile-info__edit-button');                //кнопка редактирования профиля
//const openedPopupModifier = 'popup_opened';                                             //модификатор для открытого состояния попапа
//const popupArray = Array.from(document.querySelectorAll('.popup'));                     //массив из всех попапов на странице
//const formArray = Array.from(document.querySelectorAll('.popup-form'));                 //массив из всех форм на странице

const newCardSection = new Section (
    {
        data: initialCards, 
        renderer: function () {
            const newCard = new Card ()
        }
    }
);

/*
// Удаление модификатора
const removePopupModifier = (openedPopup) => {
    openedPopup.classList.remove(openedPopupModifier);
}

// Закрываем попап, удаляем обработчик Escape
const closePopup = popupElement => {
    removePopupModifier(popupElement);
    document.removeEventListener('keydown' , handleESCclose);
}

// Обработка нажатия Escape
function handleESCclose(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'));                            //находим и закрываем открытый попап
    }
}

// Устанавливаем обработчики событий на все попапы 
popupArray.forEach((popupElement) => {
    const closeButton = popupElement.querySelector(`.${popupElement.firstElementChild.getAttribute('class')}__close-button`);
    
    // Установка обработчика на кнопку закрытия
    closeButton.addEventListener('click', evt => {
        closePopup(popupElement);
    });

    // Установка обработчика по клику на оверлее
    popupElement.addEventListener('click', evt => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupElement);
        }
    });
});

// Открываем нужный попап, который передаем аргументом popupElement
const openPopup = (popupElement) => {
    popupElement.classList.add(openedPopupModifier);                                    //Добавляем ему модификатор
    document.addEventListener('keydown' , handleESCclose);                              //добавляем открытому оену обработчик Escape
}
*/

//функция открытия окна с увеличенным фото карточки
const openImageView = (item) => {
    const elementTitle = item.parentElement.querySelector('.element__text');
    openPopup(imageViewPopup);
    imageViewElement.src = item.src;
    imageViewTitle.textContent = elementTitle.textContent;
    imageViewElement.alt = `${elementTitle.textContent}. Фото`;
}
    

//фунция заполнения формы карточки
const addPlaceElement = evt => {
    const item = {name: imageNameInput.value, link: imageLinkInput.value};
    const newCard = new Card(item, cardTempElement).getView();                          //создаем новый элемент-карточку
    const image = newCard.querySelector('.element__image');                             //находим фото в карточке
    evt.preventDefault();                                                               //отменяем стандартное действие
    newCard.querySelector('.element__image').addEventListener('click', evt => {
        openImageView(image);
    });                                                                                 //Вешаем слушатель на картинку с функцией открытия попапа
    cardElements.prepend(newCard);                                                      //Добавляем элемент в DOM
    imageNameInput.value = '';
    imageLinkInput.value = '';
    submitAddImageButton.setAttribute('disabled', '');
    submitAddImageButton.classList.add(validationElements.inactiveButtonClass);         //очищаем поля формы и отключаем кнопку
    closePopup(imageAddPopup);                                                          //закрываем попап
}

//заполнеие карточек из массива при загрузке страницы
initialCards.forEach (data => {
    const newCard = new Card(data, cardTempElement).getView();                          //создаем новый элемент-карточку
    const image = newCard.querySelector('.element__image');                             //находим фото в карточке
    newCard.querySelector('.element__image').addEventListener('click', evt => {
        openImageView(image);
    });                                                                                 //Вешаем слушатель на картинку с функцией открытия попапа
    cardElements.append(newCard);                                                       //Добавляем элемент в DOM
});

//функция открытия и инициализации формы редактирования профиля
const editProfile = () => {
    openPopup(profilePopup);
    nameField.value = name.textContent;
    aboutField.value = about.textContent;
}

//функция отправки формы редактирования профиля
const submitEditing = evt => {
    evt.preventDefault();
    name.textContent = nameField.value;
    about.textContent = aboutField.value;
    closePopup(profilePopup);
 }

 //включение валидации для каждой формы на странице
formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                    //включаем валидацию формы
});

addPlaceButton.addEventListener('click', () => {
    openPopup(imageAddPopup);
});                                                                                     //Обработчик события для кнопки добавления карточки
addForm.addEventListener('submit', addPlaceElement);                                    //Обработчик события для отправки формы добавления карточки
editButton.addEventListener('click', editProfile);                                      //обработчик события кнопки редактирования профиля
editForm.addEventListener('submit', submitEditing);                                     //обработчик события для отправки формы редактирования профиля