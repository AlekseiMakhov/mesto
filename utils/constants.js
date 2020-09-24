export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; // массив карточек для добавления при загрузке страницы

export const validationElements = {
    inputSelector: '.popup-form__text-input',
    submitButtonSelector: '.popup-form__submit-button',
    inactiveButtonClass: 'popup-form__submit-button_disabled',
    inputErrorClass: 'popup-form__text-input_type_error',
    errorClass: 'popup-form__error-text_show'
}

export const imageAddPopup = document.querySelector('#add-image');                             //всплывающее окно формы добавления карточки
export const submitButton = '.popup-form__submit-button';                                      //селектор кнопки подтверждения формы
export const imageLinkInput = '#link-input';                                                   //поле ввода ссылки
export const addPlaceButton = document.querySelector('.add-image-button');                     //кнопка добавления карточки
export const cardTempElement = document.querySelector('#place-card').content;                  //элемент с содержимым шаблона для карточки
export const imageViewPopup = document.querySelector('#view-image');                           //всплывающее окно с увеличенным изображением
export const profilePopup = document.querySelector('#profile-info__edit');                     //всплывающее окно формы редактирования профиля
export const nameInfo = document.querySelector('.profile-info__name');                         //инфо профиля "Имя"
export const aboutInfo = document.querySelector('.profile-info__description');                 //инфо профиля "О себе"
export const nameInput = profilePopup.querySelector('#name-input');                            //поле ввода имени
export const aboutInput = profilePopup.querySelector('#about-input');                          //поле ввода описания
export const editButton = document.querySelector('.profile-info__edit-button');                //кнопка редактирования профиля
export const formSelector = '.popup-form';                                                     //селектор формы
export const formArray = Array.from(document.querySelectorAll('.popup-form'));                 //массив из всех форм на странице