

//exporting the formvalidator class a default export
export default class FormValidator {
  constructor(settings, formElement) { //constructor for the formvalidator, initializes with settings and form element
    this._inputSelector = settings.inputSelector; //assigning values to the properties from the settings object
    this._submitButtonSelector = settings.submitButtonSelector; 
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;  //assigning form element to the property
    this._inputElements = Array.from( //converting nodelist of form inputs to an array
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector); //query for submit button
  }

  _showInputError(inputEl, errorMessageElm) { //method to show input errors
    inputEl.classList.add(this._inputErrorClass); //add error class to input
    errorMessageElm.textContent = inputEl.validationMessage; //display input validation message
    errorMessageElm.classList.add(this._errorClass); // add error class to error message
  }

  _hideInputError(formEl, inputEl) { // method to show input errors
    const errorMessageElm = formEl.querySelector(`#${inputEl.id}-error`); //add error class to input
    inputEl.classList.remove(this._inputErrorClass); //remove error class from input
    errorMessageElm.textContent = " "; //clear error message text
    errorMessageElm.classList.remove(this._errorClass); // remove error class from error message
  }

  _checkInputValidity(formEl, inputEl) { //method to check form validity
    if (!inputEl.validity.valid) { //if input is not valid, show error
      this._showInputError(   
        inputEl,
        formEl.querySelector(`#${inputEl.id}-error`)
      );
    } else {     //if input is valid, hide error
      this._hideInputError(formEl, inputEl);
    }
  }

  _checkFormValidity = () => { // method to check form validity
    return Array.from(this._form.querySelectorAll(this._inputSelector)).every( 
      (input) => input.validity.valid // return true if all inputs are valid
    );
  };

  toggleButtonState() {
    const isFormValid = this._checkFormValidity();  //check if form is valid
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass); // if valid, enable submit button
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass); //if not valid, disable submit button
      this._submitButton.disabled = true;
    }
  }

  setEventListeners() {  //method to set event listeners on input listeners
    this._inputElements.forEach((inputElement) => { // for each input element, 
      inputElement.addEventListener("input", () => { //add event listener for input event
        this._checkInputValidity(this._form, inputElement); //on input check input validity 
        this.toggleButtonState();    //and toggle button state
      });
    });
  }

  enableValidation() {    //method to enable form validation
    this._form.addEventListener("submit", (evt) => { //add event listener for "submit"
      evt.preventDefault();    //on submit prevent default form submission action
    });
    this.setEventListeners(); //set event listeners
  }
}