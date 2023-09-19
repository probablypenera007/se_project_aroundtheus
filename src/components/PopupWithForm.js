import PopUp from "./PopUp.js";
import * as DOM from "../utils/dom.js"

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit) {
    super( {popupSelector: DOM.profileEditModal});
    this._form = this._popup.querySelector(".modal__form");
    this.submitCallback = handleFormSubmit;
    this.setEventListeners();
    //1st param popsupSelector = modalcontainer
    //2nd param a callback functionpopupwithform
    //calls when the form's submit event fires
  }
  _getInputValues() {
    const inputs = this._form.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
    //collects data from ALL the input fields
    //returns that data as an object
  }
  setEventListeners() {
    super.setEventListeners();
    this._closeIcon.addEventListener("click", (evt) => {
      this.close();
    })
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this.submitCallback(formData);
    });
    //modifies the seteventlistener in popup
    //popup.js seteventlistener becomes a parent
    //say super.setEventlisteners() maybe???  when calling
    //this method has to add the "SUBMIT" event handler to the form
    //"CLICK" event listener to the CLOSE ICON
  }
  close() {
    super.close();
    this._form.reset();
    //modifies the close parent method in order to reset the form
    //once the popup is closed
    //maybe super.close()????
  }
  //instance of the popupwithform class for each popup
}

//export default PopUpWithForm;