import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";

export default class PopUp{
    constructor(popUpSelector) {
        this._popup = document.querySelector(popUpSelector);
        this._closeIcon = this._popup.querySelector(".modal__button-close");
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();
    }
    open() {
        this._popup.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popup.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose); 
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    setEventListeners(){
        this._closeIcon.addEventListener("click", () => {
            this.close();
        });
    }
}