export default class Card {
  constructor({ name, link, _id , isLiked }, 
    cardSelector, 
    handleCardClick, 
    handleTrashButtonClick, 
    handleHeartButton) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleHeartButton = handleHeartButton;
    //this._setLikeStatus = setLikeStatus;
    //this._cardElement = this._getElement();
  }

  _setEventListeners() {
   // console.log("setting event listener for cards")
    //this._cardElement
     // .querySelector(".card__like-button")
      this._heartButton.addEventListener("click", () => {
       //console.log('setEVENTLISTENER your heart has been liked by someone')
       //this.setLikeStatus(!this.isLiked);
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

  removeCard(cardElement){
    this._cardElement.remove();
    console.log("removecard method firing");
    this._cardElement = null;

  }


  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
 }

  _renderLikes() {
    if(this._isLiked) {
     //this._heartButton.document.querySelector(".card__like-button").classList.toggle("card__like-button_active");
      this._heartButton.classList.add("card__like-button_active")
     // this._heartButton = true; 
     // console.log("like added set lke status")
    } else {
      this._heartButton.classList.remove("card__like-button_active");
      //this._heartButton = false;
      console.log("like removed from set like status")
     // return this._handleHeartButton;
     //return this._isLiked;
    }  
    
    
    //console.log('setLikeSTATUS your heart has been liked by someone', this._isLiked);
   //return this._handleHeartButton
    //const heartButton = this._cardElement.querySelector(".card__like-button");
    //heartButton.classList.toggle("card__like-button_active", isLiked);
    //console.log('setLikeSTATUS your heart has been liked by someone', isLiked)
   // return this._handleHeartButton();
   // return this.setLikeStatus();
     // check if this._isLiked is true/false and render the correct class
  
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
    this._heartButton = this._cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

   
    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
   
  }



  getId(){
    return this._id;
  }
}