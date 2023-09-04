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
/* ELEMENTS */
const profileFormElement = document.querySelector(".modal__form");
const profileButtonEdit = document.querySelector("#profile-button-edit");
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileButtonClose = profileEditModal.querySelector(
  ".modal__button-close"
);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__subtitle");
const profileCurrentName = profileFormElement.querySelector("#edit-name");
const profileCurrentBio = profileFormElement.querySelector("#edit-bio");
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
const cardsContent = document.querySelector(".cards__content");
const cardTemplate = document
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);
const data = initialCards;

/* FUNCTIONS */
function PopUp() {
  profileEditModal.classList.remove("modal_opened");
  profileAddModal.classList.remove("modal_opened");
}

function openMod() {
  profileAddModal.classList.add("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const heartButton = cardElement.querySelector(".card__like-button");
  //delete button
  const trashButton = cardElement.querySelector(".card__delete-button");

  //add the event listener for deelte
  trashButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button");
  });
  //cardelement.removed()

  //addclicklistener to the cardimage element
  //openmodal previewimage
  heartButton.addEventListener("click", () =>
    heartButton.classList.toggle("card__like-button_active")
  );

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

/* EVENT LISTENERS */
profileButtonEdit.addEventListener("click", () => {
  profileCurrentName.value = profileName.textContent;
  profileCurrentBio.value = profileBio.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileButtonClose.addEventListener("click", () => {
  PopUp();
});

profileFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileCurrentName.value;
  profileBio.textContent = profileCurrentBio.value;
  PopUp();
});

profileFormAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = profileAddImageTitle.value;
  const link = profileAddImageLink.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardsContent.prepend(cardElement);
  PopUp();
});

profileButtonAdd.addEventListener("click", openMod);
profileButtonCloseAdd.addEventListener("click", PopUp);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsContent.prepend(cardElement);
});
