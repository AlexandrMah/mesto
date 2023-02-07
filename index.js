let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSpecialization = content.querySelector('.profile__specialization');
let editButton = content.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupName = popup.querySelector('.popup__name');
let popupSpecialization = popup.querySelector('.popup__specialization');
let popupBtn = popup.querySelector('.popup__btn');
let popupCloseBtn = popup.querySelector('.popup__close-btn');

function clickEditButton(){
  popupName.value = profileName.innerHTML;
  popupSpecialization.value = profileSpecialization.innerHTML;
  popup.setAttribute('style', 'display: flex');
}

function clickCloseButton(){
  popup.setAttribute('style', 'display: none');
}

editButton.addEventListener('click', clickEditButton);
popupCloseBtn.addEventListener('click', clickCloseButton);

function clickSaveButton(){
  profileName.textContent = popupName.value;
  profileSpecialization.textContent = popupSpecialization.value;
  popup.setAttribute('style', 'display: none');
}

popupBtn.addEventListener('click', clickSaveButton);

document.addEventListener('keydown', function(enter){
  if (enter.code === 'Enter'){
    console.log('Enter!!!');
    enter.preventDefault();
    clickSaveButton();
  }
})