
//
const imageAddPopup = document.querySelector('#image');
const addForm = imageAddPopup.querySelector('.popup-form');
const text1Field = imageAddPopup.querySelector('#text1');
const text2Field = imageAddPopup.querySelector('#text2');
const imageAddCloseButton = imageAddPopup.querySelector('.popup-form__close-button');
const addPlaceButton = document.querySelector('.add-button');
const cardTempElement = document.querySelector('#place-card').content;
const deleteButton = document.querySelector('.element__trash-button');
//
const imageViewPopup = document.querySelector('#image-view');
const imageViewCloseButton = imageViewPopup.querySelector('.popup-image__close-button');
const imageViewElement = imageViewPopup.querySelector('.popup-image__image');
const imageViewTitle = imageViewPopup.querySelector('.popup-image__title');

toggleAddImagePopup = () => {
    imageAddPopup.classList.toggle('popup_opened'); 
}

toggleImageViewPopup = () => {
    imageViewPopup.classList.toggle('popup_opened');
}

openImageView = (item) => {
    toggleImageViewPopup();
    imageViewElement.src = item.src;
    imageViewTitle.textContent = item.nextElementSibling.nextElementSibling.textContent;
    imageViewElement.alt = item.nextElementSibling.nextElementSibling.textContent + '. Фото';
}

addElement = (item) => {
    const cardElements = document.querySelector('.elements');
    const elem = cardTempElement.cloneNode(true);
    const delButton = elem.querySelector('.element__trash-button');
    const image = elem.querySelector('.element__image');
    const likeButton = elem.querySelector('.element__like');

    image.addEventListener('click', evt => {
        openImageView(evt.target);
    });

    delButton.addEventListener('click', evt => {
        evt.target.parentElement.remove();
    });
    
    likeButton.addEventListener('click', evt => {
        likeButton.classList.toggle('element__like_liked');
    });

    elem.querySelector('.element__image').src = item.link;
    elem.querySelector('.element__image').alt = item.name + '. Фото';
    elem.querySelector('.element__text').textContent = item.name;
    
    cardElements.prepend(elem);
};

addPlaceElement = evt => {
    const item = {name: addForm.querySelector('#text1').value, link: addForm.querySelector('#text2').value};
    evt.preventDefault();
    addElement(item);
    toggleAddImagePopup();   
}

initialCards.forEach (item => { 
    const elem = cardTempElement.cloneNode(true);
    addElement(item, elem);
});

imageAddCloseButton.addEventListener('click', toggleAddImagePopup);
addPlaceButton.addEventListener('click', toggleAddImagePopup);
addForm.addEventListener('submit', addPlaceElement);
imageViewCloseButton.addEventListener('click', toggleImageViewPopup);