import {
  initialCards,
  validationSettings,
  userInfoSettings,
} from "../src/constants/constants.js";
import Card from "../src/components/Card.js"; 
import FormValidator from "../src/components/FormValidator.js";
import Section from "../src/components/Section.js";
import PopUp from "../src/components/PopUp.js"; 
import PopUpWithImage from "../src/components/PopUpWithImage.js";
import PopUpWithForm from "../src/components/PopUpWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
import * as DOM from "../src/utils/dom.js";

export const data = initialCards;
/* ELEMENTS */


//function openModal(modal) {
  // open the modal
  //modal.classList.add("modal_opened"); // ad lass to show modal
  //document.addEventListener("keydown", closeByEscape); //listen for keydown event to close modal
//}

//function closeModal(modal) {
  // close the modal
  //modal.classList.remove("modal_opened"); // remove class to hide modal
  //document.removeEventListener("keydown", closeByEscape); // remove keydown event listener
//}

function handleImageClick(data) {
  //function to handle image click
  const previewImage = document.querySelector(".modal__previewImage"); //get preview image element
  const previewImageTitle = document.querySelector("#preview-title"); //get preview image title element
  previewImage.src = data.link; //set image source
  previewImage.alt = data.name; // and alt text
  previewImageTitle.textContent = data.name; //set title text
  //openModal(previewImageModal); //open preview modal
  PopUpWithImage.open();
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
//const getElement = card._getElement();

const getCardElement = (data) => {
  //function to get card element
  const card = new Card(data, "#card-template", handleImageClick); //create a card instance
  const cardElement = card.getView(); //get card view element
  return cardElement; //return card element
};

/*SECTIONS*/
const section = new Section(
  {
    items: data,
    renderer: getCardElement,
  },
  ".cards__content"
);
section.renderItems();

/*POPUP*/
function handleFormSubmit(formData) {
  profileFormEdit.addEventListener("submit", (evt) => {
    //event listener for profile edit form submit
    evt.preventDefault();
    profileName.textContent = profileCurrentName.value; //set current name input value to profile name
    profileBio.textContent = profileCurrentBio.value; // set current bio input value to porfile bio
    //closeModal(profileEditModal); //open profile edit
    popUpWithForm.close();
  
    userInfo.setUserInfo({
      name:profileName.textContent,
      job: profileBio.textContent,
    })
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
    popUpWithImage.close();
      profileFormAdd.reset();
      cardsContent.prepend(cardElement);
      addFormValidator.toggleButtonState();
    //closeModal(profileAddModal); //close profile add modal
    //profileFormAdd.reset(); //reset the profile add form
    //cardsContent.prepend(cardElement); //prepend the new card element to the card content container
    //addFormValidator.toggleButtonState(); // call the togglebuttonstate on the add form validator
  });
}

const popUpWithImage = new PopUpWithImage(".modal__previewImage");
const popUpWithForm = new PopUpWithForm (profileEditModal, handleFormSubmit);

/*USERINFO*/
const userInfo = new UserInfo (
  userInfoSettings.userNameSelector,
  userInfoSettings.jobNameSelector,
)

/* EVENT LISTENERS */

profileButtonEdit.addEventListener("click", () => {
  //event listener for profile edit button click
  const currentUserInfo =userInfo.getUserinfo();
  profileCurrentName.value = currentUserInfo.name;
  profileCurrentBio.value = currentUserInfo.job;
  popUpWithForm.open();
});





profileButtonAdd.addEventListener("click", () => {
  //event listener for profile add button click
  //openModal(profileAddModal);
  popUpWithImage.open();
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
