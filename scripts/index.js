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

//создание карточек
const itemListWrapper = document.querySelector('.elements');
const template = document.querySelector('#card').content;

//окно просмотра карточек
const popupImg = document.querySelector('.popup_open-image');
const popupImgImage = popupImg.querySelector('.popup__image');
const popupImgName = popupImg.querySelector('.popup__name-image');
const buttonPopupCloseImgBtn = popupImg.querySelector('.popup__close-btn_open-image');

//реализация закрытия окон через нажатие в стороне от попапа или ESC
const popups = document.querySelectorAll('.popup');
/*------------------------------------------*/
//функции

// открытие окна
const clickOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
}

//закрытие окна
const clickClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
}

//удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

//простановка лайков
const handleLike = (evt) => {
  const thisLike = evt.target.closest('.element__like');
  thisLike.classList.toggle('element__like_active');
  thisLike.classList.toggle('element__like_disablet');
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

//создание карточки
const createNewCard = (name, link) => { 
  const newItemElement = template.querySelector('.element').cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');

  newItemName.textContent = name;
  newItemImage.src = link;
  newItemImage.alt = name;

  const buttonDeleteCard = newItemElement.querySelector('.element__trash');
  const buttonLike = newItemElement.querySelector('.element__like');
  const buttonImageCard = newItemElement.querySelector('.element__button-img');
  const imageLink = newItemElement.querySelector('.element__image').src;
  const imageName = newItemElement.querySelector('.element__name').textContent;
  buttonDeleteCard.addEventListener('click', handleDelete);
  buttonLike.addEventListener('click', handleLike);
  buttonImageCard.addEventListener('click', () => openImage(imageLink, imageName));
  
  return newItemElement;
}

//формирование первых 6 карточек
initialCards.forEach((info) => {  
  itemListWrapper.prepend(createNewCard(info.name, info.link));
});

//добавление новой карточки
function addNewCard (evt){
  evt.preventDefault();
  
  itemListWrapper.prepend(createNewCard(nameCreateCard.value, imageCreateCard.value));  

  clickClosePopup(popupCreateCard)
  formSubmitAddCard.reset();
}

//открытие окна просмотра карточки
const openImage = (imageLink, imageName) => {
  popupImgImage.src = imageLink;
  popupImgName.textContent = imageName;
  popupImgImage.alt = imageName;
  
  clickOpenPopup(popupImg);
}

/*------------------------------------------*/
//окно редактирования профиля (вызов функций)
buttonOpenPopupProfile.addEventListener('click', fillInProfileInfo);
buttonClosePopupProfile.addEventListener('click', clickClose = (evt) => {clickClosePopup(popupEditProfole)});
popupEditProfole.addEventListener('submit', handleFormSubmitEditProfile);

//окно добавления карточек (вызов функций)
buttonOpenPopupAddCard.addEventListener('click', cardOpen = (evt) => {
  clickOpenPopup(popupCreateCard);
  inactiveSubmitButton(submitCreateCard);
});
buttonClosePopupAddCard.addEventListener('click', clickClose = (evt) => {clickClosePopup(popupCreateCard)});
formSubmitAddCard.addEventListener('submit', addNewCard);

//окно просмотра карточек (вызов функций)
buttonPopupCloseImgBtn.addEventListener('click', clickClose = (evt) => {clickClosePopup(popupImg)})

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