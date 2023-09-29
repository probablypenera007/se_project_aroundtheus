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

        
//        setDeleting(isDeleting, deletingText = "Deleting...") {
//            //super.setLoading();
//             this._hasConfirmed = true;
//            if (isDeleting) {
//              this._deletePopupSubmit.textContent = deletingText;
//            } else {
//                if(this._hasConfirmed){
//                    this._deletePopUpSubmitText = this._deletePopupSubmit.textContent;
//                    this._deletePopupSubmit.textContent  =  deletingText  
//                }else {
//             this._deletePopUpSubmit.textContent = this._deletePopUpSubmitText;
//            }this._hasConfirmed = false;
//          }
//        }
        
        setDeleting(isDeleting, deletingText="Deleting...") {
            if(isDeleting) {
                this._hasConfirmed = true;
               // his._deletePopupSubmit.textContent  =  deletingText 
               //this._deletePopupsubmit.textContent = this._deletePopUpSubmitText
               this._deletePopupSubmit.textContent = "YES";
               } else{
                if(this._hasConfirmed) {
               // deletingText = this._deletePopUpSubmitText;
                this._deletePopUpSubmitText = this._deletePopupSubmit.textContent;
                this._deletePopupSubmit.textContent  =  deletingText;
               } else{
                this._deletePopUpSubmit.textContent = this._deletePopUpSubmitText
               }this._hasConfirmed = false;
            } 
              //this._deletePopUpSubmitText.reset() 
            } 
        setSubmitCall(callback){
            this._handleFormSubmit = callback;
        }
   
}