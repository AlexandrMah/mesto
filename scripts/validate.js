//Селекторы
const selectors = {
  formSelector: '.popup__input',
  inputSelector: '.popup__element',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: '.popup__btn_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__element_type_error'
};

//Проверка валидности поля
const isValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {

    hideInputError(formElement, inputElement, selectors);
  }
};

//Добавление элементу класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, selectors) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectors.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.inputErrorClass);
};

//Удаление у элемента класса с ошибкой
const hideInputError = (formElement, inputElement, selectors) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectors.errorClass);
  errorElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
}; 


// найдем все поля внутри формы и добавим им обработчик событий
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

//найдем и переберем формы
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};
//------------------------------------------------------

// Функция принимает массив полей и возвращает валидны они оли нет
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, selectors) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {

    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
};
//------------------------------------------------------

// Вызовем функцию
enableValidation(selectors);