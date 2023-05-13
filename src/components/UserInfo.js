class UserInfo {
  constructor(name, specialization, avatar, id){
    this._name = name;
    this._specialization = specialization;
    this._avatar = avatar;
    this._id = id;
  }

  assignUserInfo(info) {
    this._name.textContent = info.name;
    this._specialization.textContent = info.about;
    this._avatar.src = info.avatar;
    this._id = info._id;
  }

  getUserInfo() {
    return{
      userName: this._name.textContent,
      userSpecialization: this._specialization.textContent
    }
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._specialization.textContent = info;
  }  
}

export default UserInfo;