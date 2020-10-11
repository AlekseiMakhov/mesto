export class UserInfo {

    constructor (userInfo) {
        this._nameInfoElement = userInfo.nameInfoElement;
        this._aboutInfoElement = userInfo.aboutInfoElement;
        this._avatarElement = userInfo.avatarElement;
    }
    //получаем данные о пользователе
    getUserInfo(userData) {
        this._nameInfoElement.textContent = userData.name;
        this._aboutInfoElement.textContent = userData.about;
        this._avatarElement.src = userData.avatar;
    }

    //записываем ссылку на новый аватар на сервер
    changeAvatar(userData, newAvatarLink) {
        userData.avatar = newAvatarLink;
    }
}