export class Popup {
    constructor (popupSelector) {
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._openedPopupMod = 'popup_opened';
    }

    //закрытие попапа
    close() {
        this.popupSelector.classList.remove(this._openedPopupMod);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //обработка кнопки Escape
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    //открытие попапа
    open() {
        this.popupSelector.classList.add(this._openedPopupMod);                                                //Добавляем ему модификатор
        document.addEventListener('keydown', this._handleEscClose);                                      //добавляем открытому окну обработчик Escape
    } 

    //установщик слушателей
    setEventListeners() {
        //находим кнопку закрытия попапа, добавляем слушатель
        const closeButton = this.popupSelector.querySelector(`.${this.popupSelector.firstElementChild.getAttribute('class')}__close-button`);
        closeButton.addEventListener('click', () => {
            this.close()});

        //добавляем слушатель клика по оверлею
        this.popupSelector.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}