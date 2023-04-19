import initialCards from "../components/data.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";

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
//формы
const addCardPopup = document.querySelector('.popup_create-card');
const editForm = popupEditProfole.querySelector('.popup__input_edit-profile');
const addForm = addCardPopup.querySelector('.popup__input_create-card');

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

const editFormValidator  = new FormValidator(selectors, popupEditProfole, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(selectors, addCardPopup, addForm);
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

  const closePopup = new Popup(popupCreateCard);
  closePopup.close();
  //clickClosePopup(popupCreateCard)
  //formSubmitAddCard.reset();
}

//создание карточки
function createCard (name, link, template) {
  const cardElement = new Card(name, link, template, handleCardClick);
  return cardElement;
}
/**************************************** */

// // открытие окна
// const clickOpenPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', pressEsc);
// }

// //закрытие окна
// const clickClosePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', pressEsc);
// }

//удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

// добавление информации о пользователе при открытии окна
const fillInProfileInfo = (evt) => {

  const userInfo = new UserInfo(nameInput, jobInput);
  userInfo.getUserInfo(profileName, profileSpecialization);

  const openPopup = new Popup(popupEditProfole);
  openPopup.open();
}

// передача данных при сохранении информации о пользователе
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();  

  // profileName.textContent = nameInput.value;
  // profileSpecialization.textContent = jobInput.value;
  const userInfo = new UserInfo(nameInput, jobInput);
  userInfo.setUserInfo(profileName, profileSpecialization);

  const closePopup = new Popup(popupEditProfole);
  closePopup.close();
  //clickClosePopup(popupEditProfole);
}

/*------------------------------------------*/
//окно редактирования профиля (вызов функций)
buttonOpenPopupProfile.addEventListener('click', fillInProfileInfo);
buttonClosePopupProfile.addEventListener('click', () => {
  const closePopup = new Popup(popupEditProfole);
  closePopup.close();
  //clickClosePopup(popupEditProfole)
});
popupEditProfole.addEventListener('submit', handleFormSubmitEditProfile);

//окно добавления карточек (вызов функций)
buttonOpenPopupAddCard.addEventListener('click', () => {
  addForm.reset();
  const openPopup = new Popup(popupCreateCard);
  openPopup.open();
  
  addFormValidator.disableSubmitButton();
});

buttonClosePopupAddCard.addEventListener('click', () => {
  const closePopup = new Popup(popupCreateCard);
  closePopup.close();
  //clickClosePopup(popupCreateCard)
});
formSubmitAddCard.addEventListener('submit', addNewCard);

//открытие окна просмотра карточки
function handleCardClick(name, link) {
  popupImg.src = link;
  popupNameImg.textContent = name; 
  popupImg.alt = name;
  const openPopup = new Popup(popupOpenImg);
  openPopup.open();
}

//окно просмотра карточек, закрытие (вызов функций)
buttonPopupCloseImgBtn.addEventListener('click', () => {
  const closePopup = new Popup(popupOpenImg);
  closePopup.close();
  //clickClosePopup(popupOpenImg)
})

//реализация закрытия окон через нажатие в стороне от попапа или ESC
// const closePopupClick = (element) => {
//   element.addEventListener('click', (evt) => {  
//     if (evt.target === evt.currentTarget) {
//       const closePopup = new Popup(element);
//       closePopup.close();
//       //clickClosePopup(element);
// 	  };
//   });
// };

// popups.forEach((element) => {
//   const closePopup = new Popup(element);
//   closePopup.close();
//   //closePopupClick(element);
// });

// Закрытие попапа на кнопку Esc
// const pressEsc = (e) => {  
//   if( e.key === "Escape"){
//     const popupCloseEsc = document.querySelector('.popup_opened');
//     clickClosePopup(popupCloseEsc);
//   }
// };