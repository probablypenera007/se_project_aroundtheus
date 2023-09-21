import * as DOM from "../utils/dom.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import { initialCards, settings } from "../constants/constants.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

const initialCardData = initialCards;

const {
  profileButtonEdit,
  profileEditModal,
  profileName,
  profileBio,
  profileCurrentName,
  profileCurrentBio,
  profileFormEdit,
  profileButtonAdd,
  profileFormAdd,
  profileAddImageTitle,
  profileAddImageLink,
  previewImageModal,
  previewImageModalClose,
  cardsContent,
  cardTemplate,
  addSubmitButton,
  editSubmitButton,
} = DOM;
const editFormValidator = new FormValidator(settings, profileFormEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileFormAdd);
addFormValidator.enableValidation();

const userinfo = new UserInfo(".profile__name", ".profile__subtitle");

const popUpWithImage = new PopUpWithImage("#modal-previewImage");

const popUpEditProfile = new PopUpWithForm(
  "#modal-edit-profile",
  (formData) => {
    const name = formData.name;
    const bio = formData.bio;
    profileName.textContent = name;
    profileBio.textContent = bio;
    popUpEditProfile.close();
  }
);

const popUpAddItem = new PopUpWithForm("#modal-add-profile", (formData) => {
  const title = formData.title;
  const link = formData.link;
  handleAddProfileFormSubmit(title, link);
});

profileFormAdd.addEventListener("submit", (evt) => {
  const title = profileAddImageTitle.value;
  const link = profileAddImageLink.value;
  handleAddProfileFormSubmit(title, link);
});

function handleAddProfileFormSubmit(title, link) {
  const newCardElement = new Card(
    { title, link },
    "#card-template",
    handleImageClick
  );
  section.addItem(newCardElement);
  popUpAddItem.close();
}

const cards = initialCardData.map((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getCardElement();
});

const section = new Section(
  {
    items: initialCardData,
    renderer: (item) => {
      const cards = new Card(item, "#card-template", handleImageClick);
      const cardElement = cards.getCardElement(item);
      section.addItem(cardElement);
    },
  },
  ".cards__content"
);

const submitButtons = document.querySelectorAll(settings.submitButtonSelector);
submitButtons.forEach((submitButton) => {
  submitButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (submitButton === editSubmitButton) {
      const newName = profileCurrentName.value;
      const newBio = profileCurrentBio.value;
      handleEditProfileFormSubmit(newName, newBio);
    } else if (submitButton === addSubmitButton) {
      const title = profileAddImageTitle.value;
      const link = profileAddImageLink.value;
      handleAddProfileFormSubmit(title, link);
    }
  });
});

function handleImageClick(data) {
  const previewImage = document.querySelector(".modal__previewImage");
  const previewImageTitle = document.querySelector("#preview-title");

  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageTitle.textContent = data.name;
  popUpWithImage.open();
}

profileButtonEdit.addEventListener("click", () => {
  profileCurrentName.value = profileName.textContent;
  profileCurrentBio.value = profileBio.textContent;

  const userData = userinfo.getUserInfo();
  profileCurrentName.value = userData.name;
  profileCurrentBio.value = userData.job;
  popUpEditProfile.open();
});

function handleEditProfileFormSubmit(newName, newBio) {
  userinfo.setUserInfo({
    name: newName,
    job: newBio,
  });

  popUpEditProfile.close();
}

profileFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newName = profileCurrentName.value;
  const newBio = profileCurrentBio.value;
  handleEditProfileFormSubmit(newName, newBio);
});

profileButtonAdd.addEventListener("click", () => {
  popUpAddItem.open();
});

profileFormAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = profileAddImageTitle.value;
  const link = profileAddImageLink.value;
  handleAddProfileFormSubmit({
    name,
    link,
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      popUpWithImage.close();
      popUpEditProfile.close();
      popUpAddItem.close();
    }
  }
}

document.addEventListener("keydown", closeByEscape);

const modals = DOM.modals;
modals.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      popUpWithImage.close();
      popUpEditProfile.close();
      popUpAddItem.close();
    }

    if (evt.target.classList.contains("modal__button-close")) {
      popUpWithImage.close();
      popUpEditProfile.close();
      popUpAddItem.close();
    }
  });
});

section.renderItems();
