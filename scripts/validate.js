// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formElm, inputEl, config) {
  const errorMessageElm = document.querySelector(".modal__error");
}

function checkInputValidity(formElm, inputEl, config) {
  if (inputEl.validity.valid) {
    showInputError(formElm, inputEl, config);
  } else {
    hideInputError(formElm, inputEl, config);
  }
}

function setEventListeners(formElm, config) {
  const { inputSelector } = config;
  const inputElm = [...formElm.querySelectorAll(inputSelector)];
  inputElm.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formElm, inputEl, config);
    });
  });

  console.log(inputElm);
}

function enableValidation(config) {
  const formElm = [...document.querySelectorAll(config.formSelector)];
  formElm.forEach((formElm) => {
    formElm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElm, config);
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

    console.log(formElm);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  modalContainer: ".modal__container",
};

enableValidation(config);
