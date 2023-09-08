// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageElm = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageElm.textContent = inputEl.validationMessage;
  errorMessageElm.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageElm = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageElm.textContent = "";
  errorMessageElm.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, config);
  }
  hideInputError(formEl, inputEl, config);
}

function hasInvalidInput(inputList) {
  return;
}

//disable buttton

//enable button
function toggleButtonState(inputElm, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;

  inputElm.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}
function setEventListeners(formEl, config) {
  const { inputSelector } = config;
  const inputElm = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputElm.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputElm, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formElm = [...document.querySelectorAll(config.formSelector)];
  formElm.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
    //look for all inputs inside of form
    //loop throguh all the inputs to see if all are valid
    //if input in not valid
    //grab the validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputd are valid
    //enable button
    //reset error message

    //console.log(formElm);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
