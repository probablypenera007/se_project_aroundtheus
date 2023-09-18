import PopUp from "./PopUp.js";

class PopUpWithImage extends PopUp {
  constructor() {
    super({ popUpSelector: ".modal-previewImage" });
    this._image = this._popup.querySelector(".modal__previewImage");
    this._caption = this._popup.querySelector(".modal__previewTitle");
  }
  open(imageSrc, caption) {
    this._image.src = imageSrc;
    this._caption.textContent = caption;
    super.open();
  }
}

export default PopUpWithImage;