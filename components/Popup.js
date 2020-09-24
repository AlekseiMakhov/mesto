export default class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('opened_popup');                                          //Добавляем ему модификатор
        document.addEventListener('keydown', this._handleESCclose);                                 //добавляем открытому оену обработчик Escape
    } 

    close() {
        this._popupSelector.classList.remove('opened_popup');
        document.removeEventListener('keydown', this._handleESCclose);
    }

    _handleEscClose() {
        if (evt.key === "Escape") {
            close();
        }
    }

    setEventListeners() {
        const closeButton = this._popupSelector.querySelector(`.${this._popupSelector.firstElementChild.getAttribute('class')}__close-button`);
        closeButton.addEventListener('click', closeButton.close.bind(this.closeButton));

        this._popupSelector.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget) {
                close();
            }
        });

    }
}