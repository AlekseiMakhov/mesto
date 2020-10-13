export class UserInfo {

    constructor (userInfo) {
        this._nameInfoElement = userInfo.nameInfoElement;
        this._aboutInfoElement = userInfo.aboutInfoElement;
        this._avatarElement = userInfo.avatarElement;
    }
    // //получаем данные о пользователе
    // // getUserInfo(userData) {
    // //     this._nameInfoElement.textContent = userData.name;
    // //     this._aboutInfoElement.textContent = userData.about;
    // //     this._avatarElement.src = userData.avatar;
    // // }

    // //записываем ссылку на новый аватар на сервер
    // changeAvatar(userData, newAvatarLink) {
    //     userData.avatar = newAvatarLink;
    // }



getUserInfo() { //возвращает объект с данными
    return {
      userName: this._nameInfoElement.textContent,
      userDescription: this._aboutInfoElement.textContent,
      userAvatar: this._avatarElement.src
    }
  }
  setUserInfo({ userName, userDescription, userAvatar }) {  //задает данные
    if (userName) this._nameInfoElement.textContent = userName;
    if (userDescription) this._aboutInfoElement.textContent = userDescription;
    if (userAvatar) this._avatarElement.src = userAvatar;
  }
}