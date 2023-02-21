const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const itemListWrapper = document.querySelector('.elements');
const template = document.querySelector('#card');

/*--------------------------------------------------------*/

const content = document.querySelector('.content');
const profileName = content.querySelector('.profile__name');
const profileSpecialization = content.querySelector('.profile__specialization');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button')

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__input');
const titleInput = popup.querySelector('.popup__title');
const nameInput = popup.querySelector('.popup__element_key_name');
const jobInput = popup.querySelector('.popup__element_key_specialization');
const popupBtn = popup.querySelector('.popup__btn');
const popupCloseBtn = popup.querySelector('.popup__close-btn');

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

/*------------------------------------------------------------*/

function clickEditButton(){
  titleInput.textContent = 'Редактировать профиль';
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialization.textContent;
  popup.classList.add('popup_opened');
}

function clickCloseButton(){
  popup.classList.remove('popup_opened');
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

  const deleteButton = newItemElement.querySelector('.element__trash');
  const likeButton = newItemElement.querySelector('.element__like');
  deleteButton.addEventListener('click', handleDelete)
  likeButton.addEventListener('click', handleLike)

  itemListWrapper.append(newItemElement);

  clickCardCloseButton()  
}

/*-----------------------------*/

const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

const handleLike = (evt) => {
  const thisLike = evt.target.closest('.element__like');
  thisLike.classList.toggle('element__like_active');
};

getItemElement = (title) => {  
  const newItemElement = template.content.cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');
  newItemName.textContent = title.name;
  newItemImage.src = title.link;

  const deleteButton = newItemElement.querySelector('.element__trash');
  const likeButton = newItemElement.querySelector('.element__like');
  deleteButton.addEventListener('click', handleDelete)
  likeButton.addEventListener('click', handleLike)
  
  return newItemElement;
}

const renderItem = (wrap, title) => {
  wrap.append(getItemElement(title))
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