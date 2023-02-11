let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSpecialization = content.querySelector('.profile__specialization');
let editButton = content.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupInput = popup.querySelector('.popup__input')
let popupName = popup.querySelector('.popup__element_key_name');
let popupSpecialization = popup.querySelector('.popup__element_key_specialization');
let popupBtn = popup.querySelector('.popup__btn');
let popupCloseBtn = popup.querySelector('.popup__close-btn');

function clickEditButton(){
  popupName.value = profileName.textContent;
  popupSpecialization.value = profileSpecialization.textContent;
  popup.classList.add('popup_opened');
}

function clickCloseButton(){
  popup.classList.remove('popup_opened');
}

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function sendData(data) {
  return await fetch('/api/apply/', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
}

async function handleFormSubmit(event){
  event.preventDefault();

  const data = serializeForm(event.target);
  const response = await sendData(data);
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', clickEditButton);
popupCloseBtn.addEventListener('click', clickCloseButton);
popupInput.addEventListener('submit', handleFormSubmit);