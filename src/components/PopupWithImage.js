import { previewImageModal, previewImageTitle } from "../constants/constants";
import PopUp from "../components/PopUp.js";

export default class PopUpWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._image = this._popup.querySelector(previewImageModal);
    this._caption = this._popup.querySelector(previewImageTitle);
  }
  open(imageSrc, caption) {
    this._image.src = imageSrc;
    this._caption.textContent = caption;
    super.open();
  }
}
