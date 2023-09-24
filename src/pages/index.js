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
const formValidators = {}
const enableValidation = (settings) => {
  DOM.formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

//User Info
const userinfo = new UserInfo(".profile__name", ".profile__subtitle");

//Card
function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getCardElement();
}

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

//Popups
const popUpWithImage = new PopUpWithImage("#modal-previewImage");
popUpWithImage.setEventListeners();

const popUpEditProfile = new PopUpWithForm(
  "#modal-edit-profile",
  (formData) => {
    userinfo.setUserInfo(formData);
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

//Event Handlers
function handleAddProfileFormSubmit(title, link) {
  const newCard = createCard({ name: title, link });
  section.addItem(newCard);
  popUpAddItem.close();
}
function handleImageClick(data) {
  popUpWithImage.open(data);
}
enableValidation(settings);

// Add Event Listeners
DOM.profileButtonEdit.addEventListener("click", () => {
  const formData = userinfo.getUserInfo();
  formValidators["modal-edit-form"].resetValidation();
  popUpEditProfile.setInputValues(formData);
  popUpEditProfile.open();
});

DOM.profileButtonAdd.addEventListener("click", () => {
  formValidators["modal-add-form"].resetValidation();
  popUpAddItem.open();
});