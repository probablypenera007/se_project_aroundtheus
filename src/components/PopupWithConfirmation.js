import Popup from "./PopUp";

export default class PopUpWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._deletePopup = document.querySelector("#modal-confirm-delete");

    }
}