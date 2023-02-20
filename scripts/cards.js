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

getItemElement = (title) => {  
  const newItemElement = template.content.cloneNode(true);
  const newItemName = newItemElement.querySelector('.element__name');
  const newItemImage = newItemElement.querySelector('.element__image');
  newItemName.textContent = title.name;
  newItemImage.src = title.link;

  const deleteButton = newItemElement.querySelector('.element__trash');
  /*const duplicateButton = newItemElement.querySelector('.button__duplicate');*/
  deleteButton.addEventListener('click', handleDelete)
  /*duplicateButton.addEventListener('click', handleDuplicate)*/
  return newItemElement;
}

const renderItem = (wrap, title) => {
  wrap.append(getItemElement(title))
};

initialCards.forEach((title) => {
  console.log(title.name);
  renderItem(itemListWrapper, title)
});