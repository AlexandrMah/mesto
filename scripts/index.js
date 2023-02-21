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

let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSpecialization = content.querySelector('.profile__specialization');
let editButton = content.querySelector('.profile__edit-button');
let addButton = content.querySelector('.profile__add-button')

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__input');
let titleInput = popup.querySelector('.popup__title');
let nameInput = popup.querySelector('.popup__element_key_name');
let jobInput = popup.querySelector('.popup__element_key_specialization');
let popupBtn = popup.querySelector('.popup__btn');
let popupCloseBtn = popup.querySelector('.popup__close-btn');

function clickEditButton(){
  titleInput.textContent = 'Редактировать профиль';
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecialization.textContent;
  popup.classList.add('popup_opened');
}

function clickAddButton(){
  titleInput.textContent = 'Новое место';
  nameInput.placeholder = 'Название';
  jobInput.placeholder = 'Ссылка на картинку';
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

/*-----------------------------------------------------------*/

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

editButton.addEventListener('click', clickEditButton);
popupCloseBtn.addEventListener('click', clickCloseButton);
formElement.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', clickAddButton);