import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor({popUpSelector}) {
    super(popUpSelector);
    this._image = this._popupElement.querySelector(".modal__previewImage");
    this._caption = this._popupElement.querySelector("#preview-title"); 
  }
  
  open(name,link) {
      this._image.src = data.link; 
      this._caption.alt = data.name; 
      this._caption.textContent = data.name; 
      super.open();
    }
  }


//export default PopUpWithImage;