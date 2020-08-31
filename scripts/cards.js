const imageAddPopup = document.querySelector('#add-image'); //всплывающее окно формы добавления карточки
const addForm = imageAddPopup.querySelector('.popup-form'); //форма добаления карточки
const submitAddImageButton = addForm.querySelector('.popup-form__submit-button'); //поле ввода названия карточки
const imageNameInput = addForm.querySelector('#image-input'); //поле ввода названия карточки
const imageLinkInput = addForm.querySelector('#link-input'); //поле ввода ссылки
const addPlaceButton = document.querySelector('.add-image-button'); //кнопка добавления карточки
const cardTempElement = document.querySelector('#place-card').content; //элемент с содержимым шаблона для карточки
const imageViewPopup = document.querySelector('#view-image'); //всплывающее окно с увеличенным изображением
const imageViewElement = imageViewPopup.querySelector('.popup-image__image'); //увеличенное изображение
const imageViewTitle = imageViewPopup.querySelector('.popup-image__title'); //подпись с названием
const cardElements = document.querySelector('.elements'); //объект (секция с карточками)

//Открытие окна с изображением
const openImageView = (item) => {
    const elementTitle = item.parentElement.querySelector('.element__text');  
    openPopup(imageViewPopup);
    imageViewElement.src = item.src;
    imageViewTitle.textContent = elementTitle.textContent;
    imageViewElement.alt = elementTitle.textContent + '. Фото';
}

//функция добавления элемента (карточки) в DOM
const addElement = (item) => {
    const elem = cardTempElement.cloneNode(true); //клонированный template-тег карточки
    const delButton = elem.querySelector('.element__trash-button'); //кнопка удаления карточки
    const image = elem.querySelector('.element__image'); //элемент карточки (изображение)
    const likeButton = elem.querySelector('.element__like'); //кнопка "лайк"

    //Обработчик события для нажатия на изображение
    image.addEventListener('click', evt => {
        openImageView(evt.target);
    });

    //Обработчик события для кнопки удаления
    delButton.addEventListener('click', evt => {
        evt.target.parentElement.remove();
    });
    
    //Обработчик события для кнопки "лайк"
    likeButton.addEventListener('click', evt => {
        likeButton.classList.toggle('element__like_liked');
    });

    //заполнение полей карточки
    elem.querySelector('.element__image').src = item.link;
    elem.querySelector('.element__image').alt = item.name + '. Фото';
    elem.querySelector('.element__text').textContent = item.name;
    
    //добавление карточки в DOM в первую позицию 
    cardElements.prepend(elem);
}

//фунция заполнения формы карточки
const addPlaceElement = evt => {
    const item = {name: imageNameInput.value, link: imageLinkInput.value};
    evt.preventDefault();
    addElement(item);
    imageNameInput.value = '';
    imageLinkInput.value = '';
    submitAddImageButton.setAttribute('disabled', '');
    submitAddImageButton.classList.add(validationElements.inactiveButtonClass);
    closePopup(imageAddPopup);

}

//заполнеие карточек из массива при загрузке страницы
initialCards.forEach (item => { 
    addElement(item);
});

addPlaceButton.addEventListener('click', () => {
    openPopup(imageAddPopup);
});                                                  //Обработчик события для кнопки добавления карточки
addForm.addEventListener('submit', addPlaceElement); //Обработчик события для отправки формы добавления карточки