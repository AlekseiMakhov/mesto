export class Card {                                 //класс для описания свойств и методов элемента-карточки
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
    //функция добавления новой карточки (возвращает DOM-объект для вставки в разметку)
    addCard() {
        const newCard = this._templateSelector.cloneNode(true); //клонированный template-тег карточки
        const _delButton = newCard.querySelector('.element__trash-button'); //кнопка удаления карточки
        const _image = newCard.querySelector('.element__image'); //элемент карточки (изображение)
        const _likeButton = newCard.querySelector('.element__like'); //кнопка "лайк"
    
        //заполнение полей карточки
        newCard.querySelector('.element__image').src = this._link;
        newCard.querySelector('.element__image').alt = this._name + '. Фото';
        newCard.querySelector('.element__text').textContent = this._name;

        //Обработчик события для кнопки удаления
        _delButton.addEventListener('click', evt => {
            _delButton.parentElement.remove();
        });
        
        //Обработчик события для кнопки "лайк"
        _likeButton.addEventListener('click', evt => {
            _likeButton.classList.toggle('element__like_liked');
        });
        return newCard;   
    }
}