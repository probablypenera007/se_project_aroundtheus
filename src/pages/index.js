import * as DOM from "../utils/dom.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import { settings } from "../constants/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import "../pages/index.css";
//API Token =  "b6ce0d00-402e-481d-9dba-ef02482eb8ce" -this is just for reference

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b6ce0d00-402e-481d-9dba-ef02482eb8ce",
    "Content-Type": "application/json",
  },
});

//Form Validators
const formValidators = {};
const enableValidation = (settings) => {
  DOM.formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//User Info
const userinfo = new UserInfo(
  ".profile__name",
  ".profile__subtitle",
  "#profile-avatar"
);

//Card
function createCard({ name, link, isLiked, _id }) {
  return new Card(
    { name, link, isLiked, _id },
    "#card-template",
    handleImageClick,
    handleTrashButtonClick,
    handleHeartButton
  ).getCardElement();
  // const trashButton = cardElement.getTrashButton();
  // trashButton.addEventListener("click", ()=> {
  // popUpConfirm.open();
  // });

  //return cardElement.getCardElement();
}

//Section
const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      //section.addItem(cardElement);
      //section.renderItems(cardElement);
    },
  },
  ".cards__content"
);
//section.renderItems();

Promise.all([api.getInitialCards(), api.getUserInfo()])
  //process the result
  .then(([cardData, formData]) => {
     console.log("Card Data:", cardData);
     console.log("Form Data:", formData)
    userinfo.setUserInfo(formData);
    userinfo.setAvatar(formData.avatar);
    cardData.forEach((item) => {
      //console.log("is like and unlike here at ForEach?",cardData)
      //cardData.setLikeStatus(cardData.isLiked)
      //const cardElement = createCard(item)
     section.addItem(createCard(item));
     console.log("is this add Item firing", item)
    // section.renderItems(createCard(item));
    //section.renderItems(cardData);
      //console.log("is like and unlike here at addItem???")
    }),
      section.renderItems(cardData);
      console.log("is this renderItem firing?", cardData);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  })
  //.finally(() => {
    //section.renderItems();
    //console.log("is like and unlike here at renderItems???", renderItems)
 // });

//Popups

//PopUpWithImage
const popUpWithImage = new PopUpWithImage("#modal-previewImage");
popUpWithImage.setEventListeners();

//PopUpWithForm
const popUpEditProfile = new PopUpWithForm(
  "#modal-edit-profile",
  ({ name, about }) => {
    return new Promise((resolve, reject) => {
      api
        .updateEditProfile({ name, about })
        .then((updateEditProfile) => {
          userinfo.setUserInfo(updateEditProfile);
        //  popUpEditProfile.close();
          resolve();
        })
      //  .catch((err) => {
     //     console.error(err);
     //     reject(err);
     //   });
    });
  }
);
popUpEditProfile.setEventListeners();

//PopUpWithForm
const popUpAddItem = new PopUpWithForm("#modal-add-profile", (formData) => {
  return new Promise((resolve, reject) => {
    const name = formData.name;
    const link = formData.link;
    handleAddProfileFormSubmit(name, link)
      .then(() => {
       // popUpAddItem.close();
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
});
popUpAddItem.setEventListeners();

//PopUpWithForm
const popUpAvatar = new PopUpWithForm("#modal-avatar", (formData) => {
  //const avatarLink = cardData.avatar;
  const avatar = formData.avatar;
  return new Promise((resolve, reject) => {
    api
      .updateAvatar(avatar)
      .then((updatedAvatar) => {
        userinfo.setAvatar(updatedAvatar.avatar);
        resolve();
        popUpAvatar.close();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
});
popUpAvatar.setEventListeners();

//PopUpWithConfirmation
const popUpConfirm = new PopUpWithConfirmation("#modal-confirm-delete");
popUpConfirm.setEventListeners();

//Event Handlers
function handleAddProfileFormSubmit(title, link) {
  return new Promise((resolve, reject) => {
    api
      .createCard({ name: title, link })
      .then((card) => {
        section.addItem(createCard(card));
        //console.log("CARD CHECK! please please work T_T.", card);
        resolve();
        popUpAddItem.close();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      })
  });
}

function handleImageClick(data) {
  popUpWithImage.open(data);
}

function handleTrashButtonClick(item) {
  console.log("enter trash index.js");

// popUpConfirm.setDeleting(false); 
  popUpConfirm.setSubmitCall(() => {
    popUpConfirm.setDeleting(true);
    api
      .deleteCard(item.getId())
      .then(() => {
        //const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        //if (cardElement){
      
        item.removeCard();
        popUpConfirm.close();
      
        // }
        //popUpConfirm.setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        //popUpConfirm.setLoading(false);
      })
      .finally (() =>   popUpConfirm.setDeleting(false)); 
  });
  //popUpConfirm.close();
  
  popUpConfirm.open();
  //console.log("exit trash index.js");
}

function handleHeartButton(item) {
 // const newIsLikedStatus = !item.isLiked;

  //item.isLiked = !item.isLiked;

  if (newIsLikedStatus) {
    api
      .likeCard(item.getId())
      .then((respond) => {
        console.log("unlike me", respond);
        item.setLikeStatus(respond.isLiked);
        //item.getCardElement().classList.remove("card__like-button_active")
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    api
      .unlikeCard(item.getId())
      .then((respond) => {
        console.log(respond)
        item.setLikeStatus(respond.isLiked);
       // item.getCardElement().classList.add("card__like-button_active")
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
  item.isLiked = newIsLikedStatus;
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

DOM.avatarImgButton.addEventListener("click", () => {
  //console.log("Successful click")
  const formData = userinfo.getUserInfo();
  formValidators["modal-avatar-form"].resetValidation();
  popUpAvatar.open();
});
