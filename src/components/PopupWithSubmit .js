import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup);
    this._popupForm = this._popup.querySelector('.popup__input_delete-card');
  }

  setSubmitAction(action) {  
    this._pressSubmit = action;
  }

  // обработчик слушателей событий, с добавлением обработчика сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._pressSubmit();
    });
  }
}

export default PopupWithSubmit;