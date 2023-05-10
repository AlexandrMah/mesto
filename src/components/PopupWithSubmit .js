import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor( popup) {
    super(popup);
  }

  // обработчик слушателей событий, с добавлением обработчика сабмита формы
  setEventListeners() {
    super.setEventListeners();
  }

  // закрытие попапа
  close() {
    super.close();
  }
}

export default PopupWithSubmit;