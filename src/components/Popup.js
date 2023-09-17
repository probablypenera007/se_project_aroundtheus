export default class Popup {
    constructor(popUpSelector) {
        //constructor single parameter
        this._popUpSelector = popUpSelector;
    }
    open(){
        //opens the popup
    }
    close(){
        //closes the popup
    }
    _handleEscClose(){
        //stores the logic for the closing the popup by pressing the Esc key
    }
    setEventListeners(){
        //hat adds a click event listener to the close icon of the popup.
        // The modal window should also close 
        //when users click on the shaded area around the form. PopupwithForm
        //PopupwithForm and PopupwithImage
    }
}