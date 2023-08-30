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
const profileButtonEdit = document.querySelector("#profile-button-edit");
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileButtonClose = profileEditModal.querySelector(
  ".modal__button-close"
);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__subtitle");
const profileCurrentName = document.querySelector("#edit-name");
const profileCurrentBio = document.querySelector("#edit-bio");
const profileFormEdit = profileEditModal.querySelector(".modal__form");
const cardsContent = document.querySelector(".cards__content");
const cardTemplate = document
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);
const data = initialCards;

/* FUNCTIONS */
function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
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
  profileEditModal.classList.add("modal_opened");
});

profileButtonClose.addEventListener("click", () => {
  closePopUp();
});

profileFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileCurrentName.value;
  profileBio.textContent = profileCurrentBio.value;
  closePopUp();
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsContent.append(cardElement);
});
