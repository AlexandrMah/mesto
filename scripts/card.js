import pressEsc from "./index.js";

class Card {  
  constructor(name, link, container, template) {
    this._name = name;
    this._link = link;
    this._container = container;
    this._template = template;
  }

  //удаление карточки
  _deleteCard = () => {
    this._view.remove();
  };

  //лайк
  _likeCard = () => {
    this._like = this._view.querySelector('.element__like');
    this._like.classList.toggle('element__like_active');
    this._like.classList.toggle('element__like_disablet');
  };  

  //просмотр карточки
  _viewCard = () => {
    this._popupImg = document.querySelector('.popup__image');
    this._popupName = document.querySelector('.popup__name-image');
    this._popupImg.src = this._img.src;
    this._popupImg.alt = this._img.alt;
    this._popupName.textContent = this._name;
     
    document.querySelector('.popup_open-image').classList.add('popup_opened');
    document.addEventListener('keydown', pressEsc);
  };

  render() {
    this._view = this._template.cloneNode(true).children[0];

    this._placeName = this._view.querySelector('.element__name');
    this._img = this._view.querySelector('.element__image');    

    this._placeName.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;    

    /*-----*/
    //удаление карточки
    this._view.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    
    //лайк
    this._view.querySelector('.element__like').addEventListener('click', this._likeCard);

    //просмотр карточки
    this._view.querySelector('.element__button-img').addEventListener('click', this._viewCard);
    /*---------*/

    this._container.prepend(this._view);
  }
}


export default Card;