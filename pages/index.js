
import {
  initialCards,
  settings,
  userInfoSettings,
} from "../src/constants/constants.js";
import FormValidator from "../src/components/FormValidator.js";
import Card from "../src/components/Card.js"; 
import Section from "../src/components/Section.js";
import PopUpWithImage from "../src/components/PopUpWithImage.js";
import PopUpWithForm from "../src/components/PopUpWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
import * as DOM from "../src/utils/dom.js";

export const data = initialCards;

function closeByEscape(evt) {
  //function to close the modal by escape key
  document.addEventListener("keydown", closeByEscape);
  if (evt.key === "Escape") {
    PopUpWithImage.close();
    popUpWithForm.close();
  //checks if key is escape
  //const openedPopup = document.querySelector(".modal_opened"); //get the current opened modal
  //closeModal(openedPopup); //close the modal
  }
  }

/*FORMVALIDATOR*/
function handleFormSubmit(formData) {}
const editFormValidator = new FormValidator(
  settings,
  DOM.profileFormEdit
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, DOM.profileFormAdd); 
addFormValidator.enableValidation();

/*CARD*/
function handleImageClick(data){
  popUpWithImage.open(data.link, data.name);
}

const getCardElement = (data) => {
  //function to get card element
  const card = new Card(data, "#card-template", handleImageClick); //create a card instance
   return card.getView(); //get card view element
   //return card element
}

/*SECTIONS*/
const section = new Section(
  {
    items: data,
    renderer: getCardElement,
  },
 DOM.cardsContent
);
section.renderItems();

/*POPUPS*/
const popUpWithImage = new PopUpWithImage(".modal__previewImage");
const popUpWithForm = new PopUpWithForm (handleFormSubmit);

/*USERINFO*/
const userInfo = new UserInfo (
  userInfoSettings.userNameSelector,
  userInfoSettings.jobNameSelector,
)



/* EVENT LISTENERS */

DOM.profileButtonEdit.addEventListener("click", () => {
  //event listener for profile edit button click
  const currentUserInfo = userInfo.getUserinfo();
  DOM.profileCurrentName.value = currentUserInfo.name;
  DOM.profileCurrentBio.value = currentUserInfo.job;
  popUpWithForm.open();
  //const currentUserInfo =userInfo.getUserinfo();
  //DOM.profileCurrentName.value = currentUserInfo.name;
  //DOM.profileCurrentBio.value = currentUserInfo.job;
  //popUpWithForm.open();
});

DOM.profileFormEdit.addEventListener("submit", (evt) => {
  //event listener for profile edit form submit
  evt.preventDefault();
  DOM.profileName.textContent = DOM.profileCurrentName.value; //set current name input value to profile name
  DOM.profileBio.textContent = DOM.profileCurrentBio.value; // set current bio input value to porfile bio
  //closeModal(profileEditModal); //open profile edit
  handleFormSubmit({ name:DOM.profileName.textContent,
    job: DOM.profileBio.textContent,})
  popUpWithForm.close();
  userInfo.setUserInfo({
  name:DOM.profileName.textContent,
  job: DOM.profileBio.textContent,
})
});

DOM.profileButtonAdd.addEventListener("click", () => {
  //event listener for profile add button click
  //openModal(profileAddModal);
  popUpWithImage.open();
});

DOM.profileFormAdd.addEventListener("submit", (evt) => {
  //event listener for profile add form syubmit
  evt.preventDefault(); //prevent default form submission
  const name = DOM.profileAddImageTitle.value; //get name and link input
  const link = DOM.profileAddImageLink.value; // from the profile add form
  const cardElement = getCardElement({name,link});
  handleFormSubmit({name,link});
//create a card element using the name and link
 //inputs from the profile add form
popUpWithImage.close();
  DOM.profileFormAdd.reset();
  DOM.cardsContent.prepend(cardElement);
  addFormValidator.toggleButtonState();
});
//closeModal(profileAddModal); //close profile add modal
//profileFormAdd.reset(); //reset the profile add form
//cardsContent.prepend(cardElement); //prepend the new card element to the card content container
//addFormValidator.toggleButtonState(); // call the togglebuttonstate on the add form validator
//initialCards.forEach((data) => {
//loop through the initial cards array
//const cardElement = getCardElement(data); //create acard element using the data
//cardsContent.prepend(cardElement); //prepend the card element to the cards container
//});
/*ESCAPE KEY FOR NMODALS*/




//modals.forEach((modalContainer) => {
//modalContainer.addEventListener("mousedown", (evt) => {
//addevent listeners to modal container
//if (evt.target.classList.contains("modal_opened")) {
  //add mousedown event listener
  //closeModal(modalContainer); //close the modal
//}
//if (evt.target.classList.contains("modal__button-close")) {
  //check if target has modal_button-close class
  //closeModal(modalContainer); //close the modal
//}
//});
//});
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

//function handleImageClick(data) {
  //function to handle image click
  
  //previewImage.src = data.link; //set image source
  //previewImage.alt = data.name; // and alt text
  //previewImageTitle.textContent = data.name; //set title text
  //openModal(previewImageModal); //open preview modal
  //PopUpWithImage.open();
//}
/*POPUP*/
