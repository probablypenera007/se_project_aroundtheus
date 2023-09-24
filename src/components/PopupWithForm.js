import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popForm = this._popupElement.querySelector(".modal__form");
    this._popSubmitBtn = this._popForm.querySelector(".modal__button_submit");
    this._popInputs = this._popForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const popInpValues = {};
    this._popInputs.forEach((input) => {
      popInpValues[input.name] = input.value;
      
    });
    return popInpValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault(); 
    const inputValue = this._getInputValues();
    this._handleFormSubmit(inputValue);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popForm.addEventListener("submit", this._handleSubmit.bind(this));
    }
   
  setInputValues(data) {
    this._popInputs.forEach((input) => {
     if (data [input.name]) {
      input.value = data[input.name];
     }
    });
  }

 close() {
   this._popForm.reset();
   super.close();
 }
}