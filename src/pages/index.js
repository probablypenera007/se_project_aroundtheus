import * as DOM from "../utils/dom.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import { initialCards, settings } from "../constants/constants.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

//Form Validators

//const formValidators = {}

// enable validation
//const enableValidation = (settings) => {
//const formList = Array.from(document.querySelectorAll(settings.formSelector))
//formList.forEach((formElement) => {
// const validator = new FormValidator(settings, formElement)
// here you get the name of the form
// const formName = formElement.getAttribute('name')

// here you store a validator by the `name` of the form
// formValidators[formName] = validator;
// validator.enableValidation();
//});
//};

//enableValidation(settings);

const editFormValidator = new FormValidator(settings, DOM.profileFormEdit);
const addFormValidator = new FormValidator(settings, DOM.profileFormAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//User Info
const userinfo = new UserInfo(".profile__name", ".profile__subtitle");

//Popups
const popUpWithImage = new PopUpWithImage("#modal-previewImage");
popUpWithImage.setEventListeners();

const popUpEditProfile = new PopUpWithForm(
  "#modal-edit-profile",
  (formData) => {
    //const name = formData.name;
    //const bio = formData.bio;
    userinfo.setUserInfo(formData);
    //DOM.profileName.textContent = name;
    //DOM.profileBio.textContent = bio;
    popUpEditProfile.close();
  }
);
popUpEditProfile.setEventListeners();

const popUpAddItem = new PopUpWithForm("#modal-add-profile", (formData) => {
  const name = formData.name;
  const link = formData.link;
  handleAddProfileFormSubmit(name, link);
});
popUpAddItem.setEventListeners();

//Section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__content"
);
section.renderItems();

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getCardElement();
}

//Event Handlers
function handleAddProfileFormSubmit(title, link) {
  const newCard = createCard({ name: title, link });
  section.addItem(newCard);
  popUpAddItem.close();
}

function handleImageClick(data) {
  // DOM.previewImage.src = data.link;
  // DOM.previewImage.alt = data.name;
  // DOM.previewImageTitle.textContent = data.name;
  popUpWithImage.open(data);
}

// Add Event Listeners
DOM.profileButtonEdit.addEventListener("click", () => {
  const formData = userinfo.getUserInfo();
  popUpEditProfile.setInputValues(formData);
  popUpEditProfile.open();
  //editFormValidator.resetValidation();
  editFormValidator.toggleButtonState();
  // formValidators["modal-edit-form"].resetValidation();
});

DOM.profileButtonAdd.addEventListener("click", () => {
  popUpAddItem.open();
  //addFormValidator.resetValidation();
  addFormValidator.toggleButtonState();
  //formValidators["modal-add-form"].resetValidation();
});

editFormValidator.setEventListeners();
addFormValidator.setEventListeners();
//DOM.profileFormEdit.addEventListener("submit", (evt) => {
//  evt.preventDefault();
//  const newName = DOM.profileCurrentName.value;
//  const newBio = DOM.profileCurrentBio.value;
//  handleEditProfileFormSubmit(newName, newBio);
//});
//
//function handleEditProfileFormSubmit(newName, newBio) {
//  userinfo.setUserInfo({
//    name: newName,
//    job: newBio,
//  });

//popUpEditProfile.close();
//}
//add event listener for closing popups by Esc key
//document.addEventListener("keydown", (evt) => {
//  if (evt.key === "Escape") {
//    const openedPopup = document.querySelector(".modal_opened");
//    if (openedPopup) {
//      popUpWithImage.close();
//      popUpEditProfile.close();
//      popUpAddItem.close();
//    }
//  }
//});

//Add event listeners for closing popups clicking outside
//DOM.modals.forEach((modalContainer) => {
//  modalContainer.addEventListener("mousedown", (evt) => {
//    if (evt.target.classList.contains("modal_opened")) {
//      popUpWithImage.close();
//      popUpEditProfile.close();
//      popUpAddItem.close();
//    }
//
//    if (evt.target.classList.contains("modal__button-close")) {
//      popUpWithImage.close();
//      popUpEditProfile.close();
//      popUpAddItem.close();
//    }  });
//});
