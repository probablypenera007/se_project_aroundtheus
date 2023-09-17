export const initialCards = [ // initial array of cards
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

export const data = initialCards;

export const validationSettings = {
    //validation settings for the form validator
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button_submit",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

/* ELEMENTS */
export const profileButtonEdit = document.querySelector("#profile-button-edit"); //profile edit button
export const profileEditModal = document.querySelector("#modal-edit-profile"); //profile edit modal
export const profileButtonClose = profileEditModal.querySelector( //profile edit modal close button
  "#modal-edit-button-close"
);
export const profileName = document.querySelector(".profile__name"); //profile name element
export const profileBio = document.querySelector(".profile__subtitle"); // profile bio element
export const profileCurrentName = document.querySelector("#edit-name"); // profile current name input
export const profileCurrentBio = document.querySelector("#edit-bio"); // profile current bio input
export const profileFormEdit = profileEditModal.querySelector("#modal-form-edit"); // profile edit form

/*ADD ELEMENTS */
export const profileButtonAdd = document.querySelector("#profile-button-add");// profile add button
export const profileAddModal = document.querySelector("#modal-add-profile"); // profile add modal
export const profileFormAdd = profileAddModal.querySelector("#add-modal-form"); //profile add form
export const profileButtonCloseAdd = profileAddModal.querySelector( // profile add modal close button
  "#modal-button-close-add"
);
export const profileAddImageTitle = profileFormAdd.querySelector("#add-title"); //profile add image title
export const profileAddImageLink = profileFormAdd.querySelector("#add-imageURL"); // prtofile add image link
export const previewImageModal = document.querySelector("#modal-previewImage"); //preview image modal

export const previewImageModalClose = previewImageModal.querySelector( //preview image modal close button
  "#modal-button-close-preview"
);
export const cardsContent = document.querySelector(".cards__content"); // card content container
export const cardTemplate = document  // cloned card template
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);