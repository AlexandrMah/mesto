//import initialCards from "../utils/data.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit .js";
import selectors from "../utils/constants.js";
import Api from "../components/Api.js";
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

//информация профиля
const profile = document.querySelector('.profile');
const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileSpecialization = profile.querySelector('.profile__specialization');
const profileAvatar = profile.querySelector('.profile__avatar') 

//попап редактирования профиля
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

//кнопки попапов
const popupBtnInfo = document.querySelector('.popup__btn_edit-profile')
const popupBtnAvatar = document.querySelector('.popup__btn_edit-avatar')
const popupBtnCard = document.querySelector('.popup__btn_create-card')

/*------------------------------------------*/
//формы
const addCardPopup = document.querySelector('.popup_create-card');
const editForm = popupEditProfole.querySelector('.popup__input_edit-profile');
const addForm = addCardPopup.querySelector('.popup__input_create-card');
const editAvatarForm = popupEditAvatar.querySelector('.popup__input_edit-avatar');

const container = document.querySelector('.elements');
const template = document.querySelector('#card').content;

let userId; // Объявление переменной id пользователя
let useer; //переменная с информацией о пользователе

/******* Валидация*******/
const editFormValidator  = new FormValidator(selectors, popupEditProfole, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(selectors, addCardPopup, addForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(selectors, popupEditAvatar, editAvatarForm);
avatarFormValidator.enableValidation();
/*********** ***********/

/*****Обращение к серверу*****/
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
    userInfo.assignUserInfo(info);
    userId = info._id;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })

//Объект с информацией о пользователе
const userInfo = new UserInfo(profileName, 
  profileSpecialization, profileAvatar);
  
//Объект section
const section = new Section( {        
      renderer: (info) => {
        const card = createCard(info, template, userId);
        section.addItem(card.render());
        } 
    }, container
    );
    
//Запрос карточек на сервере
api.getInitialCards()
  .then((res) => {    
    section.rendererItem({ items: res });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

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
    renderLoading(popupBtnAvatar, true);
    api.editInfoAvatar(avatarLink)
    .then((link) => {
      avatar.src = link.avatar;
    })    
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(popupBtnAvatar, false);// изменение кнопки попапа на Сохранить
    });    
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
    renderLoading(popupBtnCard, true);//изменение кнопки попапа на Сохранение...
    api.getAddNewCard(item.name, item.url)
    .then((info) => {
      const card = createCard(info, template, userId);
      section.prependItem(card.render());
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(popupBtnCard, false);// изменение кнопки попапа на Сохранить
    }); 
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
function createCard (info, template, userId){
  const cardElement = new Card(info, template, handleCardClick, popupWithSubmit, handleDeletePopupClick, api, userId);
  return cardElement;
}

//попуп подтверждения удаления карточки (клики)
const popupWithSubmit = new PopupWithSubmit(popupDeleteCard);
popupWithSubmit.setEventListeners();

//удаления карточки c сервера (подтверждение в попапе)
const handleDeletePopupClick = (templateCard, card) => {
  const confirmDeleteForm = async () => {
    try{
      const res = await api.deleteCard(card._id)
      console.info(res);
      templateCard.remove();
    } catch(err) {
        console.log(err); // выведем ошибку в консоль
      };      
    };
  popupWithSubmit.setSubmitAction(confirmDeleteForm);
  popupWithSubmit.open();
}
/*------------------------------------------*/

/*--------Просмотр Карточки---------*/
const openPopupImage = new PopupWithImage(popupOpenImg);
//открытие окна просмотра карточки
function handleCardClick(name, link) {
  openPopupImage.open(name, link);
}

openPopupImage.setEventListeners();

/*---Изменение кнопки сохранения при передаче информации на сервер---*/
function renderLoading(btn, isLoading){
  if (isLoading) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохраненить';;
  }
}

/*-----------------------*/

