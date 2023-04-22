import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = this._popup.querySelector('.popup__image');
    this._name = this._popup.querySelector('.popup__name-image');
   }

  open(name, link) {
    this._img.src = link;
    this._name.textContent = name; 
    this._img.alt = name;
    
    super.open();
  }
}

export default PopupWithImage;