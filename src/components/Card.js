export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._trashButton = null;
    this._heartButton = null;
    this._onDeleteClick = null;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleHeartButton();
      });

      this._trashButton = this._cardElement
      .querySelector(".card__delete-button");


    this._trashButton
      .addEventListener("click", () => {
       if (this._onDeleteClick) {
        this._onDeleteClick()
       }
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  _handleHeartButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCardElement() {
    this._cardElement = this._getElement();
    const cardTitle = this._cardElement.querySelector(".card__title");
    const cardImage = this._cardElement.querySelector(".card__image");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._heartButton = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();
    return this._cardElement;
  }

  getTrashButton() {
    return this._trashButton;
  }

  getHeartButton() {
    return this._heartButton;
  }
  }
   
