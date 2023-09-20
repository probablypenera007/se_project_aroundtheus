export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
       //this._modals = this._popupElement.querySelectorAll(".modal"); 
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
      if (evt.target.classList.contains("modal__button-close")) {
        this.close();
      }
    });
  }
}