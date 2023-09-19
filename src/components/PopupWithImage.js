import * as DOM from "../utils/dom.js"
import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super({ popUpSelector: popUpSelector});
    this._image = DOM.previewImage;
    this._caption = DOM.previewImageTitle;
  }
  open(imageSrc, caption) {
    this._image.src = imageSrc;
    this._caption.textContent = caption;
    super.open();
  }
}


//export default PopUpWithImage;