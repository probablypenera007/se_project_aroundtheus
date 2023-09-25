import Popup from "./PopUp";

export default class PopUpWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popForm = this._popupElement.querySelector(".modal__form");
        this._deletePopup = document.querySelector("#modal-confirm-delete");
        this._deletePopupCloseBtn = this._popupElement.querySelector("#modal-button-close-confirm-delete")
        this._deletePopupSubmit = this._popupElement.querySelector("#modal-button-confirm-delete")
    }
    setEventListeners(){
        super.setEventListeners();
    }
    
}