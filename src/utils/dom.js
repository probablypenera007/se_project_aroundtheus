export const modals = [...document.querySelectorAll(".modal")]; //get all modal containers
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
export const previewImage = document.querySelector(".modal__previewImage"); //get preview image element
export const previewImageTitle = document.querySelector("#preview-title"); //get preview image title element
export const previewImageModalClose = previewImageModal.querySelector( //preview image modal close button
  "#modal-button-close-preview"
);
export const cardsContent = document.querySelector(".cards__content"); // card content container
export const cardTemplate = document  // cloned card template
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);
