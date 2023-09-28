import Popup from "./PopUp";

export default class PopUpWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popForm = this._popupElement.querySelector(".modal__form");
        this._deletePopup = document.querySelector("#modal-confirm-delete");
        this._deletePopupCloseBtn = this._popupElement.querySelector("#modal-button-close-confirm-delete");
        this._deletePopupSubmit = this._popupElement.querySelector("#modal-button-confirm-delete");
        //this._deletePopupSubmit.textContent = this._popSubmitBtnText;
        this._deletePopUpSubmitText = this._deletePopupSubmit.textContent
       
    }
    //open(){
      //  super.open();
        //this._deletePopupSubmit.removeAttribute("disabled");
        //close(){
            //this._popForm.reset();
            //super.close();
           
       // }
        setEventListeners(){
            super.setEventListeners();
            this._popForm.addEventListener("submit", (evt) => {
                evt.preventDefault();
                this._handleFormSubmit();
            })
        }
       
        setLoading(isLoading, loadingText="Deleting...") {
            if(isLoading) {
                this._hasConfirmed = true;
                //return this._deletePopupSubmit.textContent  =  loadingText 
               // his._deletePopupsubmit.textContent = this._deletePopUpSubmitText
               this._deletePopupSubmit.textContent = "YES";
               } else{
                if(this._hasConfirmed) {
                //loadingText = this._deletePopUpSubmitText;
                this._deletePopUpSubmitText = this._deletePopupSubmit.textContent;
                this._deletePopupSubmit.textContent  =  loadingText 
               } else {
                this._deletePopUpSubmit.textContent = this._deletePopUpSubmitText
               }this._hasConfirmed = false;
            } 
              //this._deletePopUpSubmitText.reset() 
            } 
        setSubmitCall(callback){
            this._handleFormSubmit = callback;
        }
   
}