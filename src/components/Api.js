class Api{
  constructor(options){
    this._options = options;
    this._authorization = this._options.headers.authorization;
    this._url = this._options.baseUrl;
  }

  //информация о пользователе на сервере
  async getInfoUser(){
    try{
      const user = await fetch(`${this._options.baseUrl}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
        return await user.json();
    } catch(e) {   
      return Promise.reject(`Ошибка: ${user.status}`);
      }     
  }

  //отправка данных при редактировании профиля(editUserInfo)
  async editInfoUser({ name, specialization }){
    try{
      const infoUser = await fetch(`${this._options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: specialization,
        })
      })
        return infoUser.json();
    } catch(e) {   
        return Promise.reject(`Ошибка: ${infoUser.status}`);
      }
  }

  //отправка данных при редактировании фото
  async editInfoAvatar(avatarLink){
    try{
      const avatar = await fetch(`${this._options.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarLink.avatar
        })
      })      
        return await avatar.json();
    } catch(e) {   
        return Promise.reject(`Ошибка: ${avatar.status}`);
      }
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

  async deleteCard(id) {
    try{
      const delCard = await fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }) 
        return delCard.json();
      } catch(e) {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${delCard.status}`)
    }
  }

  async putLike(id) {
    try{
      const putLikeCard = await fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
      },
    })
        return await putLikeCard.json();
    } catch(e) {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  // удаление лайка
  async deleteLike(id) {
    try{
      const deleteLikeCard = await fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
      },
    })
        return await deleteLikeCard.json();
    } catch(e) {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${deleteLikeCard.status}`);
    };
  }

/*-----*/
}

export default Api;
