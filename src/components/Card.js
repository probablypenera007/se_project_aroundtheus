//Transforming the Card class
//Connect the Card class to the popup. 
//Make Card take the handleCardClick() function into the constructor. 
//When the user clicks on the card,
// this function will open the popup with an image.
//import PopUpWithImage from "../components/PopUpWithImage.js";

//exporting the card class as a default export making it accessible to other modules
export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) { //constructor for the card class, initializes with name
    this._name = name;                                        //name, link, cardSelector and a callback for image click
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  //method to set event listeners on card elements
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button") //add event listener for like button
      .addEventListener("click", () => {
        this._handleHeartButton();
      });
    this._cardElement
      .querySelector(".card__delete-button") // add event listener for delete button
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
    this._cardElement
      .querySelector(".card__image") // add event listener for image click
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  //method to handle functionality of like button
  _handleHeartButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //method to handle functionality of delete button
  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //method to return a cloned card element
  _getElement() {
    return document
      .querySelector(this._cardSelector) //cloned card element from the document
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //method to create view for the card
  getView() {
    this._cardElement = this._getElement(); //get card element
    const cardTitle = this._cardElement.querySelector(".card__title");//query for card title 
    const cardImage = this._cardElement.querySelector(".card__image");//and image
    cardImage.src = this._link; //sets image source
    cardImage.alt = this._name;// and alt text
    cardTitle.textContent = this._name; //set card title texdt content
    this._setEventListeners(); //set event listeners
    return this._cardElement; //return updated card element
  }
}