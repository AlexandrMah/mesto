import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor( popup,{ submitForm }) {
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
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('1',this._getInputValues());  
      this._submitForm(this._getInputValues());          
      this.close();
    });
  }

  // закрытие формы и ее сброс
  close() {
    this._form.reset();
    super.close();
  }
}

export default PopupWithForm;