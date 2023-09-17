import {
  profileFormAdd,
  profileFormEdit,
  inputSelector,
} from "../constants/constants";
import Popup from "./PopUp";

export default class PopupwithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(profileFormAdd, profileFormEdit);
    this.submitCallback = submitCallback;
    //1st param popsupSelector = modalcontainer
    //2nd param a callback functionpopupwithform
    //calls when the form's submit event fires
  }
  _getInputValues() {
    const inputs = this._form.querySelector(inputSelector);
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
    this._form.addEventListeners("submit", (evt) => {
      evt.preventDefault();
      this.submitCallback(this.inputs._getInputValues());
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
