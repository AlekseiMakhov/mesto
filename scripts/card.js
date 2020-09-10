export class Card {                                                                 //класс для описания свойств и методов элемента-карточки
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate = () => {
        this._newCard = this._templateSelector.cloneNode(true);                     //клонированный template-тег карточки
        return this._newCard;
    }

    //Устанавливаем обработчики
    _setEventListeners = (container) => {
        this._delButton = container.querySelector('.element__trash-button');       //кнопка удаления карточки
        this._likeButton = container.querySelector('.element__like');              //кнопка "лайк"
        //Обработчик кнопки удаления карточки
        this._delButton.addEventListener('click', evt => {
            this._delButton.parentElement.remove();
        });
        //Обработчик события для кнопки "лайк"
        this._likeButton.addEventListener('click', evt => {
            this._likeButton.classList.toggle('element__like_liked');
        });
    }

    //функция добавления новой карточки (возвращает DOM-объект для вставки в разметку)
    getView() {
        const newCard = this._getTemplate();                                        //клонируем шаблон
        this._image = newCard.querySelector('.element__image');                    //элемент карточки (изображение)    

        //заполнение полей карточки
        this._image.src = this._link;
        this._image.alt = `${this._name}. Фото`;
        newCard.querySelector('.element__text').textContent = this._name;

        this._setEventListeners(newCard);  

        return newCard;                                                             //возвращаем карточку
    }
}