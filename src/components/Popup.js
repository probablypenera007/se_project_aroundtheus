export default class Popup {
  constructor(popUpSelector) {
    //constructor single parameter
    this._popUpSelector = document.querySelector("modal_opened");
    this._handleEscClose = this._handleEscClose;
  }
  open() {
    //opens the popup
    this._popUpSelector.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popUpSelector.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    //closes the popup
  }
  _handleEscClose = (evt) => {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
    //stores the logic for the closing the popup by pressing the Esc key
  };
  setEventListeners() {
    //hat adds a click event listener to the close icon of the popup.
    // The modal window should also close
    //when users click on the shaded area around the form. PopupwithForm
    //PopupwithForm and PopupwithImage
  }
}
