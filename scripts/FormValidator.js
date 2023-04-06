import Card from "./card.js"

class FormValidator {  
  constructor(selectors, popup) {
    this._selectors = selectors;
    this._popup = popup
    this._formElement = popup.querySelector('form');
  }
  
  disableSubmitButton = () => {
    this._buttonElement.classList.add('popup__btn_inactive');
    this._buttonElement.setAttribute('disabled', 'true');
  }

  //переберем формы
  enableValidation = () => {
    this._setEventListeners(this._formElement, this._selectors);   
  }

  // найдем все поля внутри формы и добавим им обработчик событий
  _setEventListeners = (formElement, selectors) => {
    this._inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    this._buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    this._toggleButtonState(this._inputList, this._buttonElement, selectors);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, selectors);
        this._toggleButtonState(this._inputList, this._buttonElement, selectors);
      });
    });
  }

  //Проверка валидности поля
  _isValid = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {

      this._showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {

      this._hideInputError(formElement, inputElement, selectors);
    }
  };

  //Добавление элементу класс с ошибкой
  _showInputError = (formElement, inputElement, errorMessage, selectors) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(selectors.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.inputErrorClass);
  };

  //Удаление у элемента класса с ошибкой
  _hideInputError = (formElement, inputElement, selectors) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(selectors.errorClass);
    errorElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (inputList, buttonElement, selectors) => {  
    if (this._hasInvalidInput(inputList)) {  
      buttonElement.setAttribute('disabled', 'true');
      buttonElement.classList.add(selectors.inactiveButtonClass);

    } else {
  
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  };

  // Функция принимает массив полей и возвращает валидны они оли нет
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}

export default FormValidator;