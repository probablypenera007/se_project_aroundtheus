import Popup from "./Popup";

class PopupwithForm extends Popup{
    constructor(popupSelector , "#") {
 //1st param popsupSelector = modalcontainer
    //2nd param a callback functionpopupwithform 
    //calls when the form's submit event fires
    }
   _getInputValues(){
    //collects data from ALL the input fields
    //returns that data as an object
   }
   setEventListeners(){
    //modifies the seteventlistener in popup
    //popup.js seteventlistener becomes a parent
    //say super.setEventlisteners() maybe???  when calling
    //this method has to add the "SUBMIT" event handler to the form
    //"CLICK" event listener to the CLOSE ICON
   }
   close(){
    //modifies the close parent method in order to reset the form
    //once the popup is closed
    //maybe super.close()????
    }
    //instance of the popupwithform class for each popup
}