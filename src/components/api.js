class Api{
  constructor(options){
    this._options = options;
    this._authorization = this._options.headers.authorization;
    this._url = this._options.baseUrl;
  }

  //информация о пользователе на сервере
  getInfoUser(){
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //отправка данных при редактировании профиля(editUserInfo)
  editInfoUser({ name, specialization }){
    fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: specialization,
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //отправка данных при редактировании фото
  editInfoAvatar(avatarLink){
    fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  //информация о имеющихся карточках на сервере
  getInitialCards(){
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  //добавление новой карточки на сервер
  // getAddNewCard(name, url) {
  //   return fetch(`${this._options.baseUrl}/cards`, {
  //     method: 'POST',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       link: url
  //     })
  //   }).then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     // если ошибка, отклоняем промис
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   });
  // }
  async getAddNewCard(name, url) {
    try{
      const infoNewCard = await fetch(`${this._options.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: url
        })
      })
        return await infoNewCard.json();
    } catch(e) {
        Promise.reject(`Ошибка: ${infoNewCard.status}`);
    } 
  }

  

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

/*-----*/
}

export default Api;