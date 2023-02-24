

const itemListWrapper = document.querySelector('.elements');
const template = document.querySelector('#card');

/*----------окно редактирования профиля----------------------------------------------*/

const content = document.querySelector('.content');
const profileName = content.querySelector('.profile__name');
const profileSpecialization = content.querySelector('.profile__specialization');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button')

const popupEditProfole = document.querySelector('.popup_edit-profile');
const formElement = popupEditProfole.querySelector('.popup__input_edit-profile');
const titleInput = popupEditProfole.querySelector('.popup__title_edit-profile');
const nameInput = popupEditProfole.querySelector('.popup__element_key_name');
const jobInput = popupEditProfole.querySelector('.popup__element_key_specialization');
const popupBtn = popupEditProfole.querySelector('.popup__btn_edit-profile');
const popupCloseBtn = popupEditProfole.querySelector('.popup__close-btn_edit-profile');

/*-----------------------------------------------------------*/

const popupImg = document.querySelector('.popup-img');
const popupImgImage = popupImg.querySelector('.popup-img__image');
const popupImgName = popupImg.querySelector('.popup-img__name');
const popupImgCloseBtn = popupImg.querySelector('.popup-img__close-btn')

const itemImage = document.querySelector('.elements');

/*-----------------------------------------------------------*/

const popupCard = document.querySelector('.popup-card');
const popupCardInput = popupCard.querySelector('.popup-card__input');
const popupCardCloseBtn = popupCard.querySelector('.popup-card__close-btn');
const popupCardBtn = popupCard.querySelector('.popup-card__btn')
const popupCardName = popupCard.querySelector('.popup-card__element_key_name');
const popupCardImg = popupCard.querySelector('.popup-card__element_key_img');

/*-------------------окно редактирования профиля-----------------------------------------*/

function clickEditButton(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialization.textContent;
  popupEditProfole.classList.add('popup_opened');
}

function clickCloseButton(){
  popupEditProfole.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSpecialization.textContent = jobInput.value;

  clickCloseButton();
}

/*----------------------------*/
function clickAddButton(){
  popupCard.classList.add('popup-card_opened');
}

function clickCardCloseButton(){
  popupCard.classList.remove('popup-card_opened');
}

function creatNewCard (evt){
  evt.preventDefault();
  const newItemElement = template.content.cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');
  newItemName.textContent = popupCardName.value;
  newItemImage.src = popupCardImg.value;
  newItemImage.alt = popupCardName.value;
  popupCardName.value = "";
  popupCardImg.value = "";

  const deleteButton = newItemElement.querySelector('.element__trash');
  const likeButton = newItemElement.querySelector('.element__like');
  deleteButton.addEventListener('click', handleDelete)
  likeButton.addEventListener('click', handleLike)

  itemListWrapper.prepend(newItemElement);

  clickCardCloseButton()  
}

/*-----------------------------*/

const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

const handleLike = (evt) => {
  const thisLike = evt.target.closest('.element__like');
  thisLike.classList.toggle('element__like_active');
  thisLike.classList.toggle('element__like_hover');
};

getItemElement = (title) => {  
  const newItemElement = template.content.cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');

  newItemName.textContent = title.name;
  newItemImage.src = title.link;
  newItemImage.alt = title.name;

  const deleteButton = newItemElement.querySelector('.element__trash');
  const likeButton = newItemElement.querySelector('.element__like');
  deleteButton.addEventListener('click', handleDelete)
  likeButton.addEventListener('click', handleLike)
  
  return newItemElement;
}

const renderItem = (wrap, title) => {
  wrap.prepend(getItemElement(title))
};

initialCards.forEach((title) => {
  renderItem(itemListWrapper, title)
});

/*-----------------------------------------------------------*/

const clickViewImg  = (evt) => {
  const thisImg = evt.target.closest('.element');
  const thisImgImage = evt.target.closest('.element__image');
  const thisImgName = thisImg.querySelector('.element__name');

  popupImgImage.src = thisImgImage.src;
  popupImgName.textContent = thisImgName.textContent;
  popupImgImage.alt = thisImgName.textContent;
  
  popupImg.classList.add('popup-img_opened');
}

function clickCloseButtonImg(){
  popupImg.classList.remove('popup-img_opened');
}


itemImage.addEventListener('click', clickViewImg);
popupImgCloseBtn.addEventListener('click', clickCloseButtonImg);



editButton.addEventListener('click', clickEditButton);
popupCloseBtn.addEventListener('click', clickCloseButton);
formElement.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', clickAddButton);
popupCardCloseBtn.addEventListener('click', clickCardCloseButton);
popupCardInput.addEventListener('submit', creatNewCard);