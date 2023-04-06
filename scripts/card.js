class Card {  
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._view = this._template.cloneNode(true).children[0];
    this._placeName = this._view.querySelector('.element__name');
    this._img = this._view.querySelector('.element__image');   
    this._like = this._view.querySelector('.element__like');
    this._handleCardClick = handleCardClick;
    this._elementTrash = this._view.querySelector('.element__trash');
    this._elementButtonImg = this._view.querySelector('.element__button-img');
  }

  //удаление карточки
  _deleteCard = () => {
    this._view.remove();
  };

  //лайк
  _likeCard = () => {
    this._like.classList.toggle('element__like_active');
    this._like.classList.toggle('element__like_disablet');
  };  

  _setEventListeners = () => {
    //удаление карточки
    this._elementTrash.addEventListener('click', this._deleteCard);
    
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

    this._setEventListeners();

    return(this._view);
  }
}

export default Card;