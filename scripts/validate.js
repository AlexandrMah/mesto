//Проверка валидности поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {

    hideInputError(formElement, inputElement);
  }
};

//Добавление элементу класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__element_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

//Удаление у элемента класса с ошибкой
const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__element_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 


// найдем все поля внутри формы и добавим им обработчик событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__element'));
  const buttonElement = formElement.querySelector('.popup__btn');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//найдем и переберем формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__input'));


  formList.forEach((formElement) => {
    setEventListeners(formElement);
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
const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));

  if (hasInvalidInput(inputList)) {

    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add('popup__btn_inactive');
  } else {

    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__btn_inactive');
  }
};
//------------------------------------------------------

// Вызовем функцию
enableValidation();