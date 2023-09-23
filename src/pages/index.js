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
const editFormValidator = new FormValidator(settings, DOM.profileFormEdit);
const addFormValidator = new FormValidator(settings, DOM.profileFormAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

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

// Add Event Listeners
DOM.profileButtonEdit.addEventListener("click", () => {
  const formData = userinfo.getUserInfo();
  popUpEditProfile.setInputValues(formData);
  popUpEditProfile.open();
  // formValidators["modal-edit-form"].resetValidation();  //will make this work after project approval
});

DOM.profileButtonAdd.addEventListener("click", () => {
  popUpAddItem.open();
  addFormValidator.resetValidation();
  //formValidators["modal-add-form"].resetValidation();
});

editFormValidator.setEventListeners();
addFormValidator.setEventListeners();
