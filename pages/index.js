import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const data = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* ELEMENTS */
const profileButtonEdit = document.querySelector("#profile-button-edit");
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileButtonClose = profileEditModal.querySelector(
  "#modal-edit-button-close"
);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__subtitle");
const profileCurrentName = document.querySelector("#edit-name");
const profileCurrentBio = document.querySelector("#edit-bio");
const profileFormEdit = profileEditModal.querySelector("#modal-form-edit");

/*ADD ELEMENTS */
const profileButtonAdd = document.querySelector("#profile-button-add");
const profileAddModal = document.querySelector("#modal-add-profile");
const profileFormAdd = profileAddModal.querySelector("#add-modal-form");
const profileButtonCloseAdd = profileAddModal.querySelector(
  "#modal-button-close-add"
);
const profileAddImageTitle = profileFormAdd.querySelector("#add-title");
const profileAddImageLink = profileFormAdd.querySelector("#add-imageURL");
const previewImageModal = document.querySelector("#modal-previewImage");

const previewImageModalClose = previewImageModal.querySelector(
  "#modal-button-close-preview"
);
const cardsContent = document.querySelector(".cards__content");
const cardTemplate = document
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);

function openModal(modal) {
  // open the modal
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  // close the modal
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleImageClick(data) {
  const previewImage = document.querySelector(".modal__previewImage");
  const previewImageTitle = document.querySelector("#preview-title");
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageTitle.textContent = data.name;
  openModal(previewImageModal);
}

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_submit",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileFormEdit
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, profileFormAdd);
addFormValidator.enableValidation();

const card = new Card(data, "#card-template", handleImageClick);
const getElement = card._getElement();

function getCardElement(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getView();
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

/* EVENT LISTENERS */

profileButtonEdit.addEventListener("click", () => {
  profileCurrentName.value = profileName.textContent;
  profileCurrentBio.value = profileBio.textContent;
  openModal(profileEditModal);
});

profileFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileCurrentName.value;
  profileBio.textContent = profileCurrentBio.value;
  closeModal(profileEditModal);
});

profileButtonAdd.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileFormAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = profileAddImageTitle.value;
  const link = profileAddImageLink.value;
  const cardElement = getCardElement({
    name,
    link,
  });

  closeModal(profileAddModal);
  profileFormAdd.reset();
  cardsContent.prepend(cardElement);
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsContent.prepend(cardElement);
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

const modals = [...document.querySelectorAll(".modal")];
modals.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modalContainer);
    }
    if (evt.target.classList.contains("modal__button-close")) {
      closeModal(modalContainer);
    }
  });
});
