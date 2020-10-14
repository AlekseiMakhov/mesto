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
    removeElement() {
        this._delButton.parentElement.remove();
    }
    //Обновляем число лайков и состояние кнопки
    updateLikes(isLiked, likes) {
        if (isLiked) {
            this._likeButton.classList.add('like__button_pressed');
        } else {
            this._likeButton.classList.remove('like__button_pressed');
        }
        this._likeCount.textContent = likes.length;
    }
    //проверяем, стоит ли лайк 
    isLiked(likes, init) {
        if (init) { 
            return (likes.find((item) => item._id === this._me));
        } 
        return this._likeButton.classList.contains('like__button_pressed');
    }

    _handleLikeClick(item) {
        if (this.isLiked(item._likes, false)) {
            this._removeLike(item);
        } else {
            this._setLike(item);
        }
    }

    //Устанавливаем обработчики
    _setEventListeners() {
        
        this._delButton = this._сard.querySelector('.element__trash-button');        //кнопка удаления карточки
        this._likeButton = this._сard.querySelector('.like__button');                //кнопка "лайк"
        this._image = this._сard.querySelector('.element__image');                   //элемент картинки
        this._likeCount = this._сard.querySelector('.like__count');                  //Число лайков

        this._delButton.addEventListener('click', () => this._deleteCard(this));
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    //функция возвращает элемент для вставки в разметку
    getView() {
        const card = this._getTemplate();                                       //клонируем шаблон
        this._setEventListeners();
        const image = card.querySelector('.element__image');                    //элемент карточки (изображение)    

        //заполнение полей карточки
        image.src = this._link;
        image.alt = `${this._name}. Фото`;
        card.querySelector('.element').id = this._id;
        card.querySelector('.element__text').textContent = this._name;
        
        this.updateLikes(this.isLiked(this._likes, true), this._likes);
        if (this._owner === this._me) {                                         //проверяем, кто создал карточку
            card.querySelector('.element__trash-button').classList.add('element__trash-button_visible');
        }

        return card;                                                             //возвращаем карточку
    }
}