
import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popForm = this._popupElement.querySelector(".modal__form");
    this._popSubmitBtn = this._popForm.querySelector(".modal__button_submit");
    this._popInputs = this._popForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;


    this._popForm.addEventListener("submit", (evt) => this._handleSubmit(evt));
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
  }

  setEventListeners() {
    super.setEventListeners();
    this._popForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); 
      const inputValue = this._getInputValues();
      this._handleFormSubmit(inputValue); 
    });
  }

  close() {
    this._popForm.reset();
    super.close();
  }
}
   //({
     // evt.preventDefault();
      //const formData = 
   
   // });
    //modifies the seteventlistener in popup
    //popup.js seteventlistener becomes a parent
    //say super.setEventlisteners() maybe???  when calling
    //this method has to add the "SUBMIT" event handler to the form
    //"CLICK" event listener to the CLOSE ICON
  //}
  //close() {
    //super.close();
    //this._popForm.reset();
    //modifies the close parent method in order to reset the form
    //once the popup is closed
    //maybe super.close()????
  //}
  //instance of the popupwithform class for each popup


//export default PopUpWithForm;