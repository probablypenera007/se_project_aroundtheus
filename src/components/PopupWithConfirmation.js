import Popup from "./PopUp";

export default class PopUpWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popForm = this._popupElement.querySelector(".modal__form");
        this._deletePopup = document.querySelector("#modal-confirm-delete");
        this._deletePopupCloseBtn = this._popupElement.querySelector("#modal-button-close-confirm-delete")
        this._deletePopupSubmit = this._popupElement.querySelector("#modal-button-confirm-delete")
        //this._deletePopupSubmit.textContent = this._popSubmitBtnText;
        this._deletePopUpSubmitText =  this._deletePopupSubmit.textContent
    }
    open(){
        super.open();
        //this._deletePopupSubmit.removeAttribute("disabled");
    }
    close(){
        super.close();
        this._popForm.reset();
    }
    setEventListeners(){
        super.setEventListeners();
        this._popForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }
   
    setLoading(isLoading, loadingText="Saving...") {
        if(isLoading) {
            return this._deletePopUpSubmitText;
           } else{
             this._deletePopupSubmit.textContent = loadingText;
           }
      }
    setSubmitCall(callback){
        this._handleFormSubmit = callback;
    }
}