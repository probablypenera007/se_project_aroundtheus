export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    //
    this._closeByEscape = this._closeByEscape.bind(this);
    this._popupElementCloseBtn =this._popupElement.querySelector(".modal__button-close");      
  }

    open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

   _closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

   setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      // evt.preventDefault();
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
    this._popupElementCloseBtn.addEventListener("click", () => {
      this.close();
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