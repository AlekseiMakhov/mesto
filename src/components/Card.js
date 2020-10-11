export class Card {                                                                 //класс для описания свойств и методов элемента-карточки
    constructor({ data, handleCardClick }, templateSelector, setLike, removeLike, deleteCard) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._setLike = setLike;
        this._removeLike = removeLike;
        this._deleteCard = deleteCard;
        this._me = '30f4210744f4aa39b241353c';                                      //Мой идентификатор
    }

    _getTemplate() {
        this._сard = this._templateSelector.cloneNode(true);                        //клонированный template-тег карточки
        return this._сard;
    }
    //Ставим/снимаем лайк
    _handleLike(likeButton) {
        if (likeButton.classList.contains('like__button_pressed')) {
            likeButton.classList.remove('like__button_pressed');
            likeButton.parentElement.querySelector('.like__count').textContent = this._likes.length -= 1;
            this._removeLike(this._id);
        } else {
            likeButton.classList.add('like__button_pressed');
            likeButton.parentElement.querySelector('.like__count').textContent = this._likes.length += 1;
            this._setLike(this._id);
        };
    }

    //Устанавливаем обработчики
    _setEventListeners() {

        this._delButton = this._сard.querySelector('.element__trash-button');        //кнопка удаления карточки
        this._likeButton = this._сard.querySelector('.like__button');                //кнопка "лайк"
        this._image = this._сard.querySelector('.element__image');                   //элемент картинки
        
        this._delButton.addEventListener('click', () => this._deleteCard());
        this._likeButton.addEventListener('click', () => this._handleLike(this._likeButton));
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    //функция возвращает элемент для вставки в разметку
    getView() {
        const сard = this._getTemplate();                                       //клонируем шаблон
        this._setEventListeners(); 
        const image = сard.querySelector('.element__image');                    //элемент карточки (изображение)    

        //заполнение полей карточки
        image.src = this._link;
        image.alt = `${this._name}. Фото`;
        сard.querySelector('.element').id = this._id;
        сard.querySelector('.element__text').textContent = this._name;
        сard.querySelector('.like__count').textContent = this._likes.length;

        if (this._likes.find((card) => card._id === this._me)) {                //проверяем, ставил ли я лайк в карточке
            сard.querySelector('.like__button').classList.add('like__button_pressed');
        }
        
        if (this._owner === this._me) {                                         //проверяем, кто создал карточку
            сard.querySelector('.element__trash-button').classList.add('element__trash-button_visible');
        }

        return сard;                                                             //возвращаем карточку
    }
}