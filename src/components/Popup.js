export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
   // this._closeOverlaybyClick = this._closeOverlaybyClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
    this._popupElement.addEventListener("mousedown", this._closeOverlaybyClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
    this._popupElement.removeEventListener("mousedown", this._closeOverlaybyClick);
  }

  _closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

 // _closeOverlaybyClick(evt) {
 //   if (evt.target.classList.contains("modal_opened"))  {
 //     this.close();
 //   }
 // }

  setEventListeners(){
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")|| evt.target.classList.contains("modal__button-close"))
      {
        this.close()
      }
    })
  }

  //add event listener for closing popups by Esc key
  //document.addEventListener("keydown", (evt) => {
  //  if (evt.key === "Escape") {
  //    const openedPopup = document.querySelector(".modal_opened");
  //    if (openedPopup) {
  //      popUpWithImage.close();
  //      popUpEditProfile.close();
  //      popUpAddItem.close();
  //    }
  //  }
  //});

  //Add event listeners for closing popups clicking outside
  //DOM.modals.forEach((modalContainer) => {
  //  modalContainer.addEventListener("mousedown", (evt) => {
  //   if (evt.target.classList.contains("modal_opened")) {
  //     popUpWithImage.close();
  //     popUpEditProfile.close();
  //     popUpAddItem.close();
  //   }

  // if (evt.target.classList.contains("modal__button-close")) {
  //   popUpWithImage.close();
  //   popUpEditProfile.close();
  //   popUpAddItem.close();
  // }
  //});
  ///});
}
