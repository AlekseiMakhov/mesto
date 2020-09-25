export class Card {                                                                 //класс для описания свойств и методов элемента-карточки
    constructor({ name, link, handleCardClick }, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        this._newCard = this._templateSelector.cloneNode(true);                     //клонированный template-тег карточки
        return this._newCard;
    }

    //Устанавливаем обработчики
    _setEventListeners = (container) => {
        this._delButton = container.querySelector('.element__trash-button');        //кнопка удаления карточки
        this._likeButton = container.querySelector('.element__like');               //кнопка "лайк"
        this._image = container.querySelector('.element__image');                   //элемент картинки
        //Обработчик кнопки удаления карточки
        this._delButton.addEventListener('click', () => {
            this._delButton.parentElement.remove();
        });
        //Обработчик события для кнопки "лайк"
        this._likeButton.addEventListener('click', () => {
            this._likeButton.classList.toggle('element__like_liked');
        });
        //Обработчик события для клика на картинку
        this._image.addEventListener('click', this._handleCardClick);
    }

    //функция добавления новой карточки (возвращает DOM-объект для вставки в разметку)
    getView() {
        const newCard = this._getTemplate();                                       //клонируем шаблон
        this._image = newCard.querySelector('.element__image');                    //элемент карточки (изображение)    

        //заполнение полей карточки
        this._image.src = this._link;
        this._image.alt = `${this._name}. Фото`;
        newCard.querySelector('.element__text').textContent = this._name;

        this._setEventListeners(newCard);  

        return newCard;                                                             //возвращаем карточку
    }
}