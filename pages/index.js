import { initialCards, validationElements } from '../utils/constants.js';                           //импорт из constants.js
import { Card } from '../components/Card.js';                                                       //импорт из card.js
import { FormValidator } from '../components/FormValidator.js';                                     //импорт из formValidator.js
import { Section } from '../components/Section.js';                                                 //импорт из Section.js
import { PopupWithForm } from '../components/PopupWithForm.js';                                     //импорт из PopupWithForm.js
import { PopupWithImage } from '../components/PopupWithImage.js';                                   //импорт из PopupWithImage.js
import { UserInfo } from '../components/UserInfo.js';                                               //импорт из UserInfo.js

import {
    imageAddPopup,
    submitButton,
    imageLinkInput,
    addPlaceButton,
    cardTempElement,
    imageViewPopup,
    profilePopup,
    nameInfo,
    aboutInfo,
    nameInput,
    aboutInput,
    editButton,
    formSelector,
    formArray
} from '../utils/constants.js';

const section = new Section(
    {   items: initialCards, 
        renderer: (newCard) => {
            newCard = new Card ({item: name, item: link}, cardTempElement, handleCardClick);
        }
    },
    containerSelector
 );

const imageView = new PopupWithImage(imageViewPopup);

function handleCardClick () {
    imageView.open();
}

const imageAddForm = new PopupWithForm(imageAddPopup, 
    {submitForm: evt => {
        const newCard = new Card(
            {name: imageNameInput.value, link: imageLinkInput.value}, cardTempElement, handleCardClick).getView();   //создаем новый элемент-карточку
        section.addItem(newCard);
        evt.preventDefault();                                                                                                               //отменяем стандартное действие
        imageAddForm.querySelector(formSelector).reset();
        imageAddForm.querySelector(submitButton).setAttribute('disabled', '');
        imageAddForm.close();
    }
})

const userDataForm = new PopupWithForm(profilePopup, 
    {submitForm: evt => {
        const userData = new UserInfo({nameFielsSelector: nameInput, aboutInput});   //
        evt.preventDefault();                                                                                                               //отменяем стандартное действие
        userData.setInfo(
            nameInput,
            aboutInput,
            nameInfo,
            aboutInfo
        )
        userDataForm.querySelector(formSelector).reset();
        userDataForm.close();
    }
})



 formArray.forEach(formElement => {
    const newValidator = new FormValidator(validationElements, formElement);   
    newValidator.enableValidation();                                                    //включаем валидацию формы
});

section.renderItems();

addPlaceButton.addEventListener('click', imageAddForm.open);
                                                                                    //Обработчик события для кнопки добавления карточки
editButton.addEventListener('click', userDataForm.open);        



// // Удаление модификатора
// const removePopupModifier = (openedPopup) => {
//     openedPopup.classList.remove(openedPopupModifier);
// }

// // Закрываем попап, удаляем обработчик Escape
// const closePopup = popupElement => {
//     removePopupModifier(popupElement);
//     document.removeEventListener('keydown' , handleESCclose);
// }

// // Обработка нажатия Escape
// function handleESCclose(evt) {
//     if (evt.key === "Escape") {
//         closePopup(document.querySelector('.popup_opened'));                            //находим и закрываем открытый попап
//     }
// }

// // Устанавливаем обработчики событий на все попапы 
// popupArray.forEach((popupElement) => {
//     const closeButton = popupElement.querySelector(`.${popupElement.firstElementChild.getAttribute('class')}__close-button`);
    
//     // Установка обработчика на кнопку закрытия
//     closeButton.addEventListener('click', evt => {
//         closePopup(popupElement);
//     });

//     // Установка обработчика по клику на оверлее
//     popupElement.addEventListener('click', evt => {
//         if (evt.target === evt.currentTarget) {
//             closePopup(popupElement);
//         }
//     });
// });

// // Открываем нужный попап, который передаем аргументом popupElement
// const openPopup = (popupElement) => {
//     popupElement.classList.add(openedPopupModifier);                                    //Добавляем ему модификатор
//     document.addEventListener('keydown' , handleESCclose);                              //добавляем открытому оену обработчик Escape
// }


//функция открытия окна с увеличенным фото карточки
// function openImageView(item) {
//     const elementTitle = item.parentElement.querySelector('.element__text');
//     openPopup(imageViewPopup);
//     imageViewElement.src = item.src;
//     imageViewTitle.textContent = elementTitle.textContent;
//     imageViewElement.alt = `${elementTitle.textContent}. Фото`;
// }
    

// //фунция заполнения формы карточки
// const addPlaceElement = evt => {
//     const item = {name: imageNameInput.value, link: imageLinkInput.value};
//     const newCard = new Card(item, cardTempElement).getView();                          //создаем новый элемент-карточку
//     const image = newCard.querySelector('.element__image');                             //находим фото в карточке
//     evt.preventDefault();                                                               //отменяем стандартное действие
//     newCard.querySelector('.element__image').addEventListener('click', evt => {
//         openImageView(image);
//     });                                                                                 //Вешаем слушатель на картинку с функцией открытия попапа
//     cardElements.prepend(newCard);                                                      //Добавляем элемент в DOM
//     imageNameInput.value = '';
//     imageLinkInput.value = '';
//     submitAddImageButton.setAttribute('disabled', '');
//     submitAddImageButton.classList.add(validationElements.inactiveButtonClass);         //очищаем поля формы и отключаем кнопку
//     closePopup(imageAddPopup);                                                          //закрываем попап
// }

// //заполнеие карточек из массива при загрузке страницы
// initialCards.forEach (data => {
//     const newCard = new Card(data, cardTempElement).getView();                          //создаем новый элемент-карточку
//     const image = newCard.querySelector('.element__image');                             //находим фото в карточке
//     newCard.querySelector('.element__image').addEventListener('click', evt => {
//         openImageView(image);
//     });                                                                                 //Вешаем слушатель на картинку с функцией открытия попапа
//     cardElements.append(newCard);                                                       //Добавляем элемент в DOM
// });

// //функция открытия и инициализации формы редактирования профиля
// const editProfile = () => {
//     openPopup(profilePopup);
//     nameField.value = name.textContent;
//     aboutField.value = about.textContent;
// }

// //функция отправки формы редактирования профиля
// const submitEditing = evt => {
//     evt.preventDefault();
//     name.textContent = nameField.value;
//     about.textContent = aboutField.value;
//     closePopup(profilePopup);
//  }

 //включение валидации для каждой формы на странице
                              //обработчик события кнопки редактирования профиля
