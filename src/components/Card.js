export class Card {                                                                 //класс для описания свойств и методов элемента-карточки
    constructor({ data, handleCardClick }, userId, templateSelector, setLike, removeLike, deleteCard) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._removeLike = removeLike;
        this._setLike = setLike;
        this._deleteCard = deleteCard;
        this._me = userId;                                                          //Мой идентификатор
    }

    _getTemplate() {
        this._сard = this._templateSelector.cloneNode(true);                        //клонированный template-тег карточки
        return this._сard;
    }
  
    //удаление карточки со страницы
    removeElement(element) {
        element.remove();
    }

    updateLikes(isLiked, likeElement, likes) {
        this._likeButton = likeElement.querySelector('.like__button');
        if (isLiked) {
            this._likeButton.classList.add('like__button_pressed');
        } else {
            this._likeButton.classList.remove('like__button_pressed');
        }
        likeElement.querySelector('.like__count').textContent = likes.length;
    }

    isLiked(likes, init, likeElement) {
        if (init) { 
            return (likes.find((item) => item._id === this._me));
        } 
        return likeElement.querySelector('.like__button').classList.contains('like__button_pressed');
    }

    _handleLikeClick(item, element) {
        if (this.isLiked(item._likes, false, element)) {
            this._removeLike(item, element);
        } else {
            this._setLike(item, element);
        }
    }

    //Устанавливаем обработчики
    _setEventListeners() {
        
        this._delButton = this._сard.querySelector('.element__trash-button');        //кнопка удаления карточки
        this._likeButton = this._сard.querySelector('.like__button');                //кнопка "лайк"
        this._image = this._сard.querySelector('.element__image');                   //элемент картинки

        this._delButton.addEventListener('click', evt => { 
            this._deleteCard(evt.target.parentElement, this);
        });    
        this._likeButton.addEventListener('click', (evt) => this._handleLikeClick(this, evt.target.parentElement));
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

        this.updateLikes(this.isLiked(this._likes, true, null), сard, this._likes);
        if (this._owner === this._me) {                                         //проверяем, кто создал карточку
            сard.querySelector('.element__trash-button').classList.add('element__trash-button_visible');
        }

        return сard;                                                             //возвращаем карточку
    }
}