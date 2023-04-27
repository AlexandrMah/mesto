import initialCards from "../utils/data.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import selectors from "../utils/constants.js";
import './index.css';

//импортируем картинки
import profilePhotoImage from '../images/Avatar.png';
import logoImage from '../images/logo.svg';
import crossImage from '../images/cross.svg';

const whoIsTheGoat = [
  { name: 'profilePhoto', image: profilePhotoImage },
  { name: 'logo', image: logoImage },
  { name: 'cross', image: crossImage },
]; 

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
const editFormValidator  = new FormValidator(selectors, popupEditProfole, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(selectors, addCardPopup, addForm);
addFormValidator.enableValidation();
/*********** ***********/
/********Работа с объектом Card******** */
const container = document.querySelector('.elements');
const template = document.querySelector('#card').content;

const section = new Section( { 
    items: initialCards,
    renderer: (info) => {
      const card = createCard(info.name, info.link, template, handleCardClick);
      section.addItem(card.render());    
    } 
  }, container
);
//const newCard = 
section.rendererItem();

//Объект с информацией о пользователе
const userInfo = new UserInfo(profileName, 
  profileSpecialization);

//форма для редактирования профиля
const editPopup = new PopupWithForm(
  popupEditProfole, {
  submitForm: ({ name, info }) => {
    userInfo.setUserInfo({
      name: nameInput.value,
      info: jobInput.value,
    });
    editPopup.close();
  }
});

//окрытие попапа редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.userName;
  jobInput.value = info.userSpecialization;
  editPopup.open();
});

editPopup.setEventListeners();


/*-------- Создание карточки --------*/
//форма для создания карточки
const addPopup = new PopupWithForm(
  popupCreateCard, {
  submitForm: ( item ) => {
    console.log('item', item);
    console.log(item.name, item.url);
    const card = createCard(item.name, item.url, template);
    console.log('card', card);
    section.addItem(card.render());
    addPopup.close();
  }
});

addPopup.setEventListeners();

//окно добавления карточек (вызов функций)
buttonOpenPopupAddCard.addEventListener('click', () => {
  addPopup.open();  
  addFormValidator.disableSubmitButton();
});

//создание карточки
function createCard (name, link, template) {
  const cardElement = new Card(name, link, template, handleCardClick);
  return cardElement;
}

// передача данных при сохранении информации о пользователе
const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();  

  // const userInfo = new UserInfo({ profileName, profileSpecialization });
  userInfo.setUserInfo(profileName, profileSpecialization);

  const closePopup = new PopupWithForm(popupEditProfole, editForm);
  closePopup.close();
}
/*------------------------------------------*/

//закрытие попапа добавления карточки
buttonClosePopupAddCard.addEventListener('click', () => {
  const closePopup = new Popup(popupCreateCard);
  closePopup.close();
});
//добавление карточки на кнопку сохранить
addForm.addEventListener('submit', addNewCard);

/*--------Просмотр Карточки---------*/
const openPopupImage = new PopupWithImage(popupOpenImg);
//открытие окна просмотра карточки
function handleCardClick(name, link) {
//  const openPopupImage = new PopupWithImage(popupOpenImg);
  openPopupImage.open(name, link);
}

openPopupImage.setEventListeners();