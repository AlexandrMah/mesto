class Popup {
  constructor(popup){
    this._popup = popup;
    this._popupCloseEsc = document.querySelector('.popup_opened');
  }

  // открытие окна
  open = () => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._closePopupClick);
  }

  //закрытие окна
  close = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closePopupClick);
  }

  // закрытие попапа на кнопку Esc
  _handleEscClose = (e) => {
    if( e.key === "Escape"){
      this.close();
    }
  };

  //реализация закрытия окон через нажатие в стороне от попапа
  _closePopupClick = (e) => {
    if (e.target === e.currentTarget) {
      this.close();      
    }    
  };

  // добавление слушателей событий
  setEventListeners = () => {
    this._popupCloseEsc.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', () => {
      this._closePopupClick();
    });
  };
}

export default Popup;