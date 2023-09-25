import * as DOM from "../utils/dom.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import {settings} from "../constants/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js"
import "../pages/index.css";
//API Token =  "b6ce0d00-402e-481d-9dba-ef02482eb8ce" -this is just for reference



  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
      "Content-Type": "application/json"
   }
  });

    
   
 
  


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
const userinfo = new UserInfo(".profile__name", ".profile__subtitle", "#profile-avatar");

function fetchInfoUpdate(){}

//Card
function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick, 
  handleTrashButton, 
  //handleHeartButton
  )
 // const trashButton = cardElement.getTrashButton();
 // trashButton.addEventListener("click", ()=> {
   // popUpConfirm.open();
 // });
  return cardElement.getCardElement();
}


//Section
const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__content",
);
section.renderItems();

Promise.all([api.getInitialCards(), api.getUserInfo()])
//process the result
.then(([cardData, formData]) => {
 userinfo.setUserInfo(formData);
 cardData.forEach((card) => {
   section.addItem(createCard(card));
 })
})
.catch((err) => {
 console.error(err);// log the error to the console
}); 
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

const popUpAvatar = new PopUpWithForm("#modal-avatar", (cardData) => {
  const avatarLink = cardData.avatar;
handleAvatarFormSubmit(avatarLink);
});
popUpAvatar.setEventListeners();

const popUpConfirm = new PopUpWithConfirmation("#modal-confirm-delete")
popUpConfirm.setEventListeners();


//Event Handlers
function handleAddProfileFormSubmit(title, link) {
  api.createCard({ name: title, link })
  .then((card) => {
    section.addItem(createCard(card));
    console.log("CARD CHECK! please please work T_T.", card);
    popUpAddItem.close();
  })
.catch((err) => {
  console.error(err);
}) 
}


function handleImageClick(data) {
  popUpWithImage.open(data);
}

function handleTrashButton(cardId) {
  popUpConfirm.setEventListeners(() => {
    api.deleteCard(cardId)
    .then(() => {
      section.removeItem(cardId);
      popUpConfirm.close();
    })
    .catch((error) => {
      console.error("Error:", error);
      popUpConfirm.close();
    })
  })
  popUpConfirm.open();
}

//function handleHeartButton(cardId, isLiked){
//  if(isLiked) {
//    api.unlikeCard(cardId)
//    .then((updateCard) => {
//      updateCardLikes(cardId, updateCardLikes.likes)
//    })
//    .catch((error) => {
//      console.error("Error:", error);
//    });
//  }else {
//    api.likeCard(cardId)
//    .then((updateCard) => {
//      updateCardLikes(cardId, updateCard.likes);
//    })
//    .catch((error) => {
//      console.error("Error:", error);
//    });
//  }
//}

//function updateCardLikes(cardId, likes){

//}

function handleAvatarFormSubmit() {
  const avatarLink =document.querySelector('input[name="avatar"]').value;
  api
 .updateAvatar(avatarLink)
 .then((updateAvatar) => {
  DOM.avatarImage.src = updateAvatar.avatar;
  console.log("Successful Upload", updateAvatar);
  popUpAvatar.close();
 })
  .catch((error) => {
    console.error("Error:", error)
  })
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

DOM.avatarImage.addEventListener("click", () => {
  formValidators["modal-avatar-form"].resetValidation();
  popUpAvatar.open();
}) 

