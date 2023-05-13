class Card {  
  constructor(info, template, handleCardClick, popupWithSubmit, handleDeletePopupClick, api, userId){
    this._api = api
    this._info = info;
    this._name = info.name;
    this._link = info.link;
    this._likes = info.likes;
    this._template = template;
    this._popupDeletOk = popupWithSubmit;
    this._handleDeletePopupClick = handleDeletePopupClick;
    this._view = this._template.cloneNode(true).children[0];
    this._placeName = this._view.querySelector('.element__name');
    this._img = this._view.querySelector('.element__image');   
    this._like = this._view.querySelector('.element__like');
    this._handleCardClick = handleCardClick;
    this._elementTrash = this._view.querySelector('.element__trash');
    this._elementButtonImg = this._view.querySelector('.element__button-img');
    this._counterLike = this._view.querySelector('.element__counter-like');
    this._cardUserId = info.owner._id;
    this._userId = userId;
  }

  //октрытие попапа для подтверждения удаления карточки
  _handleDeleteIconClick = () => {    
    this._popupDeletOk.open();
    this._handleDeletePopupClick(this._view, this._info);
  }  

  _isLiked(){
    return this._likes.some(element => element._id === this._userId);
  }

  //лайк
  _likeCard = () => {
    if (this._isLiked()){
      this._like.classList.add('element__like_active');
      this._like.classList.remove('element__like_disablet');
    }
  };

  _handleLikeClick = () => {
    if (this._isLiked()){
      this._api.deleteLike(this._info._id)
      .then((res) =>{
        this._like.classList.remove('element__like_active');
        this._like.classList.add('element__like_disablet');
        this._counterLike.textContent = res.likes.length;
        this._likes = res.likes;
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
    } else {
      this._api.putLike(this._info._id)
      .then((res) =>{
        this._like.classList.add('element__like_active');
        this._like.classList.remove('element__like_disablet');
        this._counterLike.textContent = res.likes.length;
        this._likes = res.likes;
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }) 
    }
  }
  _setEventListeners = () => {
    //открытие попапа удаления карточки
    if (this._view.querySelector('.element__trash') !== null){      
      this._elementTrash.addEventListener('click', this._handleDeleteIconClick);
    };
    
    //лайк
    this._like.addEventListener('click', this._handleLikeClick);
    
    //просмотр карточки
    this._elementButtonImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

  render() {
    this._placeName.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
    this._counterLike.textContent = this._likes.length;
    if (this._cardUserId != this._userId) {
      this._elementTrash.parentNode.removeChild(this._elementTrash);
    }
    this._likeCard();
    this._setEventListeners();

    return(this._view);
  }
}

export default Card;
