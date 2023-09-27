export default class Card {
  constructor({ name, link, _id , isLiked }, cardSelector, handleCardClick, handleTrashButtonClick, handleHeartButton,) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._cardElement = this._getElement();
    this._handleHeartButton = handleHeartButton;
  }

  _setEventListeners() {
    console.log("setting event listener for cards")
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        console.log('setEVENTLISTENER your heart has been liked by someone')
        this._handleHeartButton(this);
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
    const heartButton =
    this._cardElement
      .querySelector(".card__like-button");
      console.log("before toggle");
      heartButton.classList.toggle("card__like-button_active");
      console.log("after toggle");
      console.log(heartButton.classList.contains("card__like-button_active"));
      console.log('HANDLEHEARTBUTTON your heart has been liked by someone MIGHT BE A DUPLICATE')
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

setLikeStatus(isLiked) {
  this._isLiked = isLiked;
  const heartButton = this._cardElement.querySelector(".card__like-button");
  heartButton.classList.toggle("card__like-button_active", isLiked);
  //console.log('setLikeSTATUS your heart has been liked by someone', isLiked)
  this._handleHeartButton();
}

  getId(){
    return this._id;
  }
}