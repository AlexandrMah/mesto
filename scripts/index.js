import initialCards from "./data.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";

//окно редактирования профиля
const profile = document.querySelector('.profile');
const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileSpecialization = profile.querySelector('.profile__specialization'); 

const popupEditProfole = document.querySelector('.popup_edit-profile');
const buttonClosePopupProfile = popupEditProfole.querySelector('.popup__close-btn_edit-profile');
const nameInput = popupEditProfole.querySelector('.popup__element_key_name');
const jobInput = popupEditProfole.querySelector('.popup__element_key_specialization');

//окно добавления карточек 
const buttonOpenPopupAddCard = profile.querySelector('.profile__add-button');

const popupCreateCard = document.querySelector('.popup_create-card');
const buttonClosePopupAddCard = popupCreateCard.querySelector('.popup__close-btn_create-card');
const nameCreateCard = popupCreateCard.querySelector('.popup__element_key_name');
const imageCreateCard = popupCreateCard.querySelector('.popup__element_key_img');
const formSubmitAddCard = popupCreateCard.querySelector('.popup__input_create-card');

const submitCreateCard = popupCreateCard.querySelector('.popup__btn_create-card');

//окно просмотра карточек
const popupOpenImg = document.querySelector('.popup_open-image');
const buttonPopupCloseImgBtn = popupOpenImg.querySelector('.popup__close-btn_open-image');
const popupImg = popupOpenImg.querySelector('.popup__image');
const popupNameImg = popupOpenImg.querySelector('.popup__name-image');

//реализация закрытия окон через нажатие в стороне от попапа или ESC
const popups = document.querySelectorAll('.popup');
/*------------------------------------------*/
//функции

/******* Валидация*******/

//Селекторы
const selectors = {
  formSelector: '.popup__input',
  inputSelector: '.popup__element',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__element_type_error'
};

const editFormValidator  = new FormValidator(selectors, popupEditProfole);
editFormValidator.enableValidation();

const addCardPopup = document.querySelector('.popup_create-card');
const addFormValidator = new FormValidator(selectors, addCardPopup);
addFormValidator.enableValidation();

/*********** ***********/

/*************Работа с объектом Card**************************** */
const container = document.querySelector('.elements');
const template = document.querySelector('#card').content;

//формирование первых 6 карточек
initialCards.forEach((info) => {  
  const card = createCard(info.name, info.link, template, handleCardClick);
  container.prepend(card.render());
});

//добавление новой карточки
function addNewCard (evt){
  evt.preventDefault();

  const card = createCard(nameCreateCard.value, imageCreateCard.value, template, handleCardClick);
  container.prepend(card.render());

  clickClosePopup(popupCreateCard)
  //formSubmitAddCard.reset();
}

//создание карточки
function createCard (name, link, template) {
  const cardElement = new Card(name, link, template, handleCardClick);
  return cardElement;
}
/**************************************** */

// открытие окна
const clickOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
}

//закрытие окна
const clickClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
  if (popup != popupOpenImg) {  
    popup.querySelector('form').reset();
  }
}

//удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

// добавление информации о пользователе при открытии окна
const fillInProfileInfo = (evt) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialization.textContent;
  clickOpenPopup(popupEditProfole);
}

// передача данных при сохранении информации о пользователе
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();  

  profileName.textContent = nameInput.value;
  profileSpecialization.textContent = jobInput.value;

  clickClosePopup(popupEditProfole);
}

/*------------------------------------------*/
//окно редактирования профиля (вызов функций)
buttonOpenPopupProfile.addEventListener('click', fillInProfileInfo);
buttonClosePopupProfile.addEventListener('click', () => {clickClosePopup(popupEditProfole)});
popupEditProfole.addEventListener('submit', handleFormSubmitEditProfile);

//окно добавления карточек (вызов функций)
buttonOpenPopupAddCard.addEventListener('click', () => {
  clickOpenPopup(popupCreateCard);
  addFormValidator.disableSubmitButton();
});

buttonClosePopupAddCard.addEventListener('click', () => {clickClosePopup(popupCreateCard)});
formSubmitAddCard.addEventListener('submit', addNewCard);

//открытие окна просмотра окрточки
function handleCardClick(name, link) {
  popupImg.src = link;
  popupNameImg.textContent = name; 
  popupImg.alt = name;
  clickOpenPopup(popupOpenImg); 
}

//окно просмотра карточек, закрытие (вызов функций)
buttonPopupCloseImgBtn.addEventListener('click', () => {clickClosePopup(popupOpenImg)})

//реализация закрытия окон через нажатие в стороне от попапа или ESC
const closePopupClick = (element) => {
  element.addEventListener('click', (evt) => {  
    if (evt.target === evt.currentTarget) {
      clickClosePopup(element);
	  };
  });
};

popups.forEach((element) => {
  closePopupClick(element);
});

// Закрытие попапа на кнопку Esc
const pressEsc = (e) => {  
  if( e.key === "Escape"){
    const popupCloseEsc = document.querySelector('.popup_opened'); 
    clickClosePopup(popupCloseEsc);
  }
};