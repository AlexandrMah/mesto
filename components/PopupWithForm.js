import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup); 
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__input');
    this._formElements = this._form.querySelectorAll('.popup__element');    
  }
  //Сбор данных со всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._formElements.forEach((element) => {
      this._inputValues[element.name] = element.value;
    });
    return this._inputValues;
  }

  // обработчик слушателей событий, с добавлением обработчика сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
      this._getInputValues();
    }); 
  }

  // закрытие формы и ее сброс
  close() {
    this._form.reset();
    super.close();
  }
}

export default PopupWithForm;