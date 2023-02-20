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