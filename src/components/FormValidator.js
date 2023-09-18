export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;  
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector; 
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    
    this._setEventListeners(); // Call the method to set event listeners
  }

  _showInputError(inputEl) {
    const errorMessageElm = this._form.querySelector(`#${inputEl.id}-error`); 
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElm.textContent = inputEl.validationMessage;
    errorMessageElm.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageElm = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageElm.textContent = " ";
    errorMessageElm.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _checkFormValidity = () => {
    return this._inputList.every(
      (input) => input.validity.valid
    );
  };

  toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}