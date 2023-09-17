import {
  initialCards,
  data,
  profileButtonEdit,
  profileEditModal,
  profileButtonClose,
  profileName,
  profileBio,
  profileCurrentName,
  profileCurrentBio,
  profileFormEdit,
  profileButtonAdd,
  profileAddModal,
  profileFormAdd,
  profileButtonCloseAdd,
  profileAddImageTitle,
  profileAddImageLink,
  previewImageModal,
  previewImageModalClose,
  cardsContent,
  cardTemplate,
  validationSettings,
} from "../src/constants/constants.js";
import Card from "../src/components/Card.js"; //importing the Card class
import FormValidator from "../src/components/FormValidator.js"; //and formvalidator class
import Section from "../src/components/Section.js";
//import Popup from "../components/Popup.js";
//import PopupWithImage from "../components/PopupWithImage.js";
//import PopupWithForm from "../components/PopupWithForm.js";
//import UserInfo from "../components/Userinfo.js";

function openModal(modal) {
  // open the modal
  modal.classList.add("modal_opened"); // ad lass to show modal
  document.addEventListener("keydown", closeByEscape); //listen for keydown event to close modal
}

function closeModal(modal) {
  // close the modal
  modal.classList.remove("modal_opened"); // remove class to hide modal
  document.removeEventListener("keydown", closeByEscape); // remove keydown event listener
}

function handleImageClick(data) {
  //function to handle image click
  const previewImage = document.querySelector(".modal__previewImage"); //get preview image element
  const previewImageTitle = document.querySelector("#preview-title"); //get preview image title element
  previewImage.src = data.link; //set image source
  previewImage.alt = data.name; // and alt text
  previewImageTitle.textContent = data.name; //set title text
  openModal(previewImageModal); //open preview modal
}


/*FORMVALIDATOR*/
const editFormValidator = new FormValidator( //create form validator for profile edit form
  validationSettings,
  profileFormEdit
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, profileFormAdd); //create form validator for profile add form
addFormValidator.enableValidation();

/*CARD*/
const card = new Card(data, "#card-template", handleImageClick); //create a card instance
const getElement = card._getElement();

function getCardElement(data) {
  //function to get card element
  const card = new Card(data, "#card-template", handleImageClick); //create a card instance
  const cardElement = card.getView(); //get card view element
  return cardElement; //return card element
}

/*SECTIONS*/
const section = new Section(
  {
    items: data,
    renderer: getCardElement,
  },
  ".cards__content"
);
section.renderItems();

/* EVENT LISTENERS */

profileButtonEdit.addEventListener("click", () => {
  //event listener for profile edit button click
  profileCurrentName.value = profileName.textContent;
  profileCurrentBio.value = profileBio.textContent;
  openModal(profileEditModal);
});

profileFormEdit.addEventListener("submit", (evt) => {
  //event listener for profile edit form submit
  evt.preventDefault();
  profileName.textContent = profileCurrentName.value; //set current name input value to profile name
  profileBio.textContent = profileCurrentBio.value; // set current bio input value to porfile bio
  closeModal(profileEditModal); //open profile edit
});

profileButtonAdd.addEventListener("click", () => {
  //event listener for profile add button click
  openModal(profileAddModal);
});

profileFormAdd.addEventListener("submit", (evt) => {
  //event listener for profile add form syubmit
  evt.preventDefault(); //prevent default form submission
  const name = profileAddImageTitle.value; //get name and link input
  const link = profileAddImageLink.value; // from the profile add form
  const cardElement = getCardElement({
    //create a card element using the name and link
    name, //inputs from the profile add form
    link,
  });

  closeModal(profileAddModal); //close profile add modal
  profileFormAdd.reset(); //reset the profile add form
  cardsContent.prepend(cardElement); //prepend the new card element to the card content container
  addFormValidator.toggleButtonState(); // call the togglebuttonstate on the add form validator
});

//initialCards.forEach((data) => {
  //loop through the initial cards array
  //const cardElement = getCardElement(data); //create acard element using the data
  //cardsContent.prepend(cardElement); //prepend the card element to the cards container
//});

function closeByEscape(evt) {
  //function to close the modal by escape key
  if (evt.key === "Escape") {
    //checks if key is escape
    const openedPopup = document.querySelector(".modal_opened"); //get the current opened modal
    closeModal(openedPopup); //close the modal
  }
}

const modals = [...document.querySelectorAll(".modal")]; //get all modal containers
modals.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    //addevent listeners to modal container
    if (evt.target.classList.contains("modal_opened")) {
      //add mousedown event listener
      closeModal(modalContainer); //close the modal
    }
    if (evt.target.classList.contains("modal__button-close")) {
      //check if target has modal_button-close class
      closeModal(modalContainer); //close the modal
    }
  });
});
