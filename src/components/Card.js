export default class Card {
  constructor({ name, link, _id }, cardSelector, handleCardClick, handleTrashButtonClick, ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._cardElement = this._getElement();
    //this._handleHeartButton = handleHeartButton;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleHeartButton();
      });

      this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => 
        //console.log("delete card in card.js");
        //this._handleTrashButton(this._id);
        this._handleTrashButtonClick(this));
      

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


  //_trashButtonClick() {
   
  //  }


  //_handleTrashButton() {
  //  if (this._handleTrashClick){
  //    this._handleTrashClick(this._id);
  //  }
 // }

  removeCard(cardElement){
    this._cardElement.remove();
    console.log("removecard method firing");
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
    this._setEventListeners();
    return this._cardElement;
  }

  getId(){
    return this._id;
  }
}