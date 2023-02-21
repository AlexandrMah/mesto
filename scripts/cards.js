const popupImg = document.querySelector('.popup-img');
const popupImgImage = popupImg.querySelector('.popup-img__image');
const popupImgName = popupImg.querySelector('.popup-img__name');
const popupImgCloseBtn = popupImg.querySelector('.popup-img__close-btn')

/*-------------------------------------------------*/
const itemImage = document.querySelector('.elements');
/*------------------------------------------------------*/
const clickViewImg  = (evt) => {
  const thisImg = evt.target.closest('.element');
  const thisImgImage = evt.target.closest('.element__image');
  const thisImgName = thisImg.querySelector('.element__name');

  console.log(thisImg);
  console.log(thisImgImage.src);
  console.log(thisImgName.textContent);

  popupImgImage.src = thisImgImage.src;
  popupImgName.textContent = thisImgName.textContent;
  
  popupImg.classList.add('popup-img_opened');
}

function clickCloseButtonImg(){
  popupImg.classList.remove('popup-img_opened');
}


itemImage.addEventListener('click', clickViewImg);
popupImgCloseBtn.addEventListener('click', clickCloseButtonImg);