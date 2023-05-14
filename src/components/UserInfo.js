class UserInfo {
  constructor(name, specialization, avatar){
    this._name = name;
    this._specialization = specialization;
    this._avatar = avatar;
  }

  assignUserInfo(info) {
    this.setUserInfo(info.name, info.about);
    this._avatar.src = info.avatar;
  }

  getUserInfo() {
    return{
      userName: this._name.textContent,
      userSpecialization: this._specialization.textContent
    }
  }

  getUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._specialization.textContent = info;
  }  
}

export default UserInfo;