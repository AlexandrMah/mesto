class UserInfo {
  constructor(name, specialization){
    this._name = name;
    this._specialization = specialization;
  }

  getUserInfo = (name, specialization) => {
    this._name.value = name.textContent;
    this._specialization.value = specialization.textContent;
  }

  setUserInfo = (name, specialization) => {
    name.textContent = this._name.value;
    specialization.textContent = this._specialization.value;
  }  
}

export default UserInfo;