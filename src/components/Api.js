export class Api {

    constructor(options) {
        this._headers = options.headers;            //Передаем заголовок
        this._baseUrl = options.baseUrl;            //Передаем базовый URL
    }

    _sendRequest(link, params) {
        return fetch(link, params)
            .then((res) => { 
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`)
            })
    }

    //редактирование профиля
    editProfileInfo(data) {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }
    
    //запрос данных профиля
    getProfileInfo() {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            headers: this._headers  
        })
    }
    //редактирование аватара
    editAvatar(srcLink) {
        return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: srcLink
            })
        })
    }
    //отправка данных о новой карточке
    createNewCard(cardInfo) {
        return this._sendRequest(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })  
        })
    }
    //удаление карточки
    deleteCard(cardId) {
        return this._sendRequest(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
    //ставим лайк
    setLike(cardId) {
        return this._sendRequest(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
    }
    //удаляем лайк
    removeLike(cardId) {
        return this._sendRequest(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }
    //запрос массива карточек
    getInitialCards() {
        return this._sendRequest(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }
}