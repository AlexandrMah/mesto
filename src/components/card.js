class Card {  
  constructor(info, template, handleCardClick, popupWithSubmit, deleteCardOkInfo){
    this._info = info;
    this._name = info.name;
    this._link = info.link;
    this._likes = info.likes.length;
    this._template = template;
    this._popupDeletOk = popupWithSubmit;
    this._deleteCardOkInfo = deleteCardOkInfo;  
    this._view = this._template.cloneNode(true).children[0];
    this._placeName = this._view.querySelector('.element__name');
    this._img = this._view.querySelector('.element__image');   
    this._like = this._view.querySelector('.element__like');
    this._handleCardClick = handleCardClick;
    this._elementTrash = this._view.querySelector('.element__trash');
    this._elementButtonImg = this._view.querySelector('.element__button-img');
    this._counterLike = this._view.querySelector('.element__counter-like');
    this._cardUserId = info.owner._id;
    this._userId = 'e427ce50782c82c06f44818b'  
  }

  //октрытие попапа для подтверждения удаления карточки
  _handleDeleteIconClick = () => {    
    this._popupDeletOk.open();
    this._deleteCardOkInfo(this._view, this._info._id);
  }

  info() {
    return this._info;
  }

  //лайк
  _likeCard = () => {
    this._like.classList.toggle('element__like_active');
    this._like.classList.toggle('element__like_disablet');
  };  

  _setEventListeners = () => {
    //открытие попапа удаления карточки
    if (this._view.querySelector('.element__trash') !== null){
      
      this._elementTrash.addEventListener('click', this._handleDeleteIconClick);

    };
    
    //лайк
    this._like.addEventListener('click', this._likeCard);
    
    //просмотр карточки
    this._elementButtonImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

  render() {
    this._placeName.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
    this._counterLike.textContent = this._likes;
    if (this._cardUserId != this._userId) {
      this._elementTrash.parentNode.removeChild(this._elementTrash);
    }
    this._setEventListeners();

    return(this._view);
  }
}

export default Card;