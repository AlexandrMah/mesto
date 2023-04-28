class UserInfo {
  constructor(name, specialization){
    this._name = name;
    this._specialization = specialization;
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