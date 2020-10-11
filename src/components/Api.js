export class Api {

    constructor(options) {
        this._headers = options.headers;            //Передаем заголовок
        this._baseUrl = options.baseUrl;            //Передаем базовый URL
    }

    _resolveCheck(res) {                            //Функция проверки статуса запроса
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`)
    }
    //редактирование профиля
    editProfileInfo(userName, userAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
        .then(this._resolveCheck)
    }
    //запрос данных профиля
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers  
        })
        .then(this._resolveCheck)
    }
    //редактирование аватара
    editAvatar(srcLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: srcLink
            })
        })
        .then(this._resolveCheck)
    }
    //отправка данных о новой карточке
    createNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })  
        })
        .then(this._resolveCheck);
    }
    //удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._resolveCheck)
    }
    //ставим лайк
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._resolveCheck)
        .then();
    }
    //удаляем лайк
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._resolveCheck)
        .then();
    }
    //запрос массива карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._resolveCheck)
    }
}