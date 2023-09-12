export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //".card__image"
    //".card__title"
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleHeartButton();
      });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
  }

  _handleHeartButton() {
    this._cardElement
      .querySelector(".card__like-buton")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //public method
    //get the card view
    // this._cardElement = cardTemplate;

    //this._cardImage = this._cardElement.querySelector(".card__image");
    //const cardTitle = this._cardElement.querySelector(".card__title");
    this._heartButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    //set event listeners
    this._setEventListeners();
    //return the card
  }
}
