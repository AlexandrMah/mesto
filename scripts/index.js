//окно редактирования профиля
const profile = document.querySelector('.profile');
const openEditProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileSpecialization = profile.querySelector('.profile__specialization'); 

const popupEditProfole = document.querySelector('.popup_edit-profile');
const closeEditProfile = popupEditProfole.querySelector('.popup__close-btn_edit-profile');
const nameInput = popupEditProfole.querySelector('.popup__element_key_name');
const jobInput = popupEditProfole.querySelector('.popup__element_key_specialization');

//окно добавления карточек 
const openAddCard = profile.querySelector('.profile__add-button');

const popupCreateCard = document.querySelector('.popup_create-card');
const popupCloseCreateCard = popupCreateCard.querySelector('.popup__close-btn_create-card');
const nameCreateCard = popupCreateCard.querySelector('.popup-card__element_key_name');
const imageCreateCard = popupCreateCard.querySelector('.popup__element_key_img');
const saveCreateCard = popupCreateCard.querySelector('.popup__input_create-card')

//создание карточек
const itemListWrapper = document.querySelector('.elements');
const template = document.querySelector('#card').content;

//окно просмотра карточек
const popupImg = document.querySelector('.popup_open-image');
const popupImgImage = popupImg.querySelector('.popup__image');
const popupImgName = popupImg.querySelector('.popup__name-image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close-btn_open-image')

/*------------------------------------------*/
//функции

// открытие окна
const clickOpenButton = (name) => {
  name.classList.add('popup_opened');
}

//закрытие окна
const clickCloseButton = (name) => {
  name.classList.remove('popup_opened');
}

//удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

//простановка лайков
const handleLike = (evt) => {
  const thisLike = evt.target.closest('.element__like');
  thisLike.classList.toggle('element__like_active');
  thisLike.classList.toggle('element__like_hover');
};

// добавление информации о пользователе при открытии окна
const profileInfo = (evt) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialization.textContent;
  clickOpenButton(popupEditProfole);
}

// передача данных при сохранении информации о пользователе
const handleFormSubmit = (evt) => {
  evt.preventDefault();  

  profileName.textContent = nameInput.value;
  profileSpecialization.textContent = jobInput.value;

  clickCloseButton(popupEditProfole);
}

//создание карточки
renderItem = (name, link) => { 
  const newItemElement = template.querySelector('.element').cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');

  newItemName.textContent = name;
  newItemImage.src = link;
  newItemImage.alt = name;

  const deleteButton = newItemElement.querySelector('.element__trash');
  const likeButton = newItemElement.querySelector('.element__like');
  const imageCard = newItemElement.querySelector('.element__button-img');
  const imageLink = newItemElement.querySelector('.element__image').src;
  const imageName = newItemElement.querySelector('.element__name').textContent;
  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  imageCard.addEventListener('click', () => openImage(imageLink, imageName));
  
  return newItemElement;
}

//формирование первых 6 карточек
initialCards.forEach((info) => {  
  itemListWrapper.prepend(renderItem(info.name, info.link));
});

//добавление новой карточки
function creatNewCard (evt){
  evt.preventDefault();

  itemListWrapper.prepend(renderItem(nameCreateCard.value, imageCreateCard.value));
  console.log(itemListWrapper);

  clickCloseButton(popupCreateCard)
  nameCreateCard.value.value = "";
  imageCreateCard.value = "";
}

//открытие окна просмотра карточки
const openImage = (imageLink, imageName) => {
  popupImgImage.src = imageLink;
  popupImgName.textContent = imageName;
  popupImgImage.alt = imageName;
  
  clickOpenButton(popupImg);
}

/*------------------------------------------*/
//окно редактирования профиля (вызов функций)
openEditProfile.addEventListener('click', profileInfo);
closeEditProfile.addEventListener('click', clickClose = (evt) => {clickCloseButton(popupEditProfole)});
popupEditProfole.addEventListener('submit', handleFormSubmit);

//окно добавления карточек (вызов функций)
openAddCard.addEventListener('click', cardOpen = (evt) => {clickOpenButton(popupCreateCard)});
popupCloseCreateCard.addEventListener('click', clickClose = (evt) => {clickCloseButton(popupCreateCard)});
saveCreateCard.addEventListener('submit', creatNewCard);

//окно просмотра карточек (вызов функций)
popupImgCloseBtn.addEventListener('click', clickClose = (evt) => {clickCloseButton(popupImg)})
