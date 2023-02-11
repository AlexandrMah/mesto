let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSpecialization = content.querySelector('.profile__specialization');
let editButton = content.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__input')
let nameInput = popup.querySelector('.popup__element_key_name');
let jobInput = popup.querySelector('.popup__element_key_specialization');
let popupBtn = popup.querySelector('.popup__btn');
let popupCloseBtn = popup.querySelector('.popup__close-btn');

let nam;
let job;

function clickEditButton(){
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

  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', clickEditButton);
popupCloseBtn.addEventListener('click', clickCloseButton);
formElement.addEventListener('submit', handleFormSubmit); 