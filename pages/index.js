import initialCards from "../utils/data.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
//форма попупа добавления карточки
const imageCreateCard = popupCreateCard.querySelector('.popup__element_key_img');

//окно просмотра карточек
const popupOpenImg = document.querySelector('.popup_open-image');
const buttonPopupCloseImgBtn = popupOpenImg.querySelector('.popup__close-btn_open-image');

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

const section = new Section( { 
    items: initialCards,
    renderer: (info) => {
      const card = createCard(info.name, info.link, template, handleCardClick);
      section.addItem(card.render());    
    } 
  }, container
)
const newCard = section.rendererItem();

//добавление новой карточки
function addNewCard (evt){
  evt.preventDefault();

  const card = createCard(nameCreateCard.value, imageCreateCard.value, template, handleCardClick);
  container.prepend(card.render());

  const closePopup = new PopupWithForm(popupCreateCard, addForm);
  closePopup.close();
}

//создание карточки
function createCard (name, link, template) {
  const cardElement = new Card(name, link, template, handleCardClick);
  return cardElement;
}

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

  const userInfo = new UserInfo(nameInput, jobInput);
  userInfo.setUserInfo(profileName, profileSpecialization);

  const closePopup = new PopupWithForm(popupEditProfole, editForm);
  closePopup.close();
}
/*------------------------------------------*/
//окно редактирования профиля (вызов функций)
buttonOpenPopupProfile.addEventListener('click', fillInProfileInfo);

buttonClosePopupProfile.addEventListener('click', () => {
  const closePopup = new Popup(popupEditProfole);
  closePopup.close();
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
});
addForm.addEventListener('submit', addNewCard);

//открытие окна просмотра карточки
function handleCardClick(name, link) {
  const openPopupImage = new PopupWithImage(popupOpenImg);
  openPopupImage.open(name, link);
}

//окно просмотра карточек, закрытие (вызов функций)
buttonPopupCloseImgBtn.addEventListener('click', () => {
  const closePopup = new Popup(popupOpenImg);
  closePopup.close();
  //clickClosePopup(popupOpenImg)
})