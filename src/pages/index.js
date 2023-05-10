//import initialCards from "../utils/data.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit .js";
import selectors from "../utils/constants.js";
import Api from "../components/api.js";
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
const profileAvatar = profile.querySelector('.profile__avatar') 

const popupEditProfole = document.querySelector('.popup_edit-profile');
const buttonClosePopupProfile = popupEditProfole.querySelector('.popup__close-btn_edit-profile');
const nameInput = popupEditProfole.querySelector('.popup__element_key_name');
const jobInput = popupEditProfole.querySelector('.popup__element_key_specialization');

const popupEditAvatar = document.querySelector('.popup_edit-avatar');

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

//попап кнопки подтверждения удаления карты
const popupDeleteCard = document.querySelector('.popup_delete-card');
//попап, кнопка подтверждения удаления карточки
const formDeleteButtonOk = popupDeleteCard.querySelector('.popup__input_delete-card');

/*------------------------------------------*/
//формы
const addCardPopup = document.querySelector('.popup_create-card');
const editForm = popupEditProfole.querySelector('.popup__input_edit-profile');
const addForm = addCardPopup.querySelector('.popup__input_create-card');
const editAvatarForm = popupEditAvatar.querySelector('.popup__input_edit-avatar');

const container = document.querySelector('.elements');
const template = document.querySelector('#card').content;

/******* Валидация*******/
const editFormValidator  = new FormValidator(selectors, popupEditProfole, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(selectors, addCardPopup, addForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(selectors, popupEditAvatar, editAvatarForm);
avatarFormValidator.enableValidation();
/*********** ***********/

/*****Сервер*****/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '964fdb52-1202-4ec7-a0d2-a00430190f53',
    'Content-Type': 'application/json'
  }
});

//Запрос информации о пользователе
api.getInfoUser()
  .then((info) => {
    profileName.textContent = info.name;
    profileSpecialization.textContent = info.about;
    profileAvatar.src = info.avatar;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Запрос карточек на сервере
api.getInitialCards()
  .then((res) => {
    const section = new Section( { 
      items: res,
      renderer: (info) => {
        const card = createCard(info, template);
        section.addItem(card.render());
        } 
    }, container
    );
    section.rendererItem();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// async function initialCards(){
//   try{ 
//     const main = await api.getInitialCards(); 
//     console.log('main', main);
//     return main;
//   } catch(error){
//     console.error(error);
//   }
// }

// const data = await initialCards();
// console.log(data, 'data');

/********Работа с объектом Card******** */
// const section = new Section( { 
//     items: data,
//     renderer: (info) => {
//       const card = createCard(info.name, info.link, template, handleCardClick);
//       section.addItem(card.render());    
//     } 
//   }, container
// ); 
// section.rendererItem();

//Объект с информацией о пользователе
const userInfo = new UserInfo(profileName, 
  profileSpecialization);

//форма для редактирования профиля
const editPopup = new PopupWithForm(
  popupEditProfole, {
  submitForm: ({ name, specialization }) => {
    //запрос на сервер, изменение данных профиля
    api.editInfoUser({ name, specialization })
    userInfo.setUserInfo(name, specialization);
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

/*-------Аватар------------------*/
//форма редактирования аватара
const avatar = document.querySelector('.profile__avatar');
const editPopupAvatar = new PopupWithForm(
  popupEditAvatar, {
  submitForm: (avatarLink) => {
    api.editInfoAvatar(avatarLink);
    avatar.src = avatarLink.avatar;
    editPopupAvatar.close();
  }
  }
);

editPopupAvatar.setEventListeners();

//окно редактирования аватара (вызов функции)
const buttonOpenPopupEditAvatar = document.querySelector('.profile__edit-photo');
buttonOpenPopupEditAvatar.addEventListener('click', () => {
  editPopupAvatar.open();
  avatarFormValidator.disableSubmitButton();
});

/*-------- Создание карточки --------*/
//форма создания новой карточки
const addPopup = new PopupWithForm(
  popupCreateCard, {
  submitForm: ( item ) => {
    api.getAddNewCard(item.name, item.url)
    .then((info) => {
      const card = createCard(info, template);
      container.prepend(card.render());
    })
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
function createCard (info, template){
  const cardElement = new Card(info, template, handleCardClick, popupWithSubmit, deleteCardOkInfo);
  return cardElement;
}

//попуп подтверждения удаления карточки (клики)
const popupWithSubmit = new PopupWithSubmit(popupDeleteCard);
popupWithSubmit.setEventListeners();

//удаления карточки c сервера
function deleteCardOkInfo(templateCard, id){  
  formDeleteButtonOk.addEventListener('submit', (evt) => {
    evt.preventDefault();  
      api.deleteCard(id)
      .then((info) => {
        templateCard.remove();
      });
      popupWithSubmit.close()  
  });
}
/*------------------------------------------*/

/*--------Просмотр Карточки---------*/
const openPopupImage = new PopupWithImage(popupOpenImg);
//открытие окна просмотра карточки
function handleCardClick(name, link) {
  openPopupImage.open(name, link);
}

openPopupImage.setEventListeners();