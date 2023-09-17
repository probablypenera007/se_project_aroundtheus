import Popup from "./Popup";

class PopupWithImage extends Popup{
    //child class of PopUp
    //this class has to change the parent open()method
    constructor(){
       super(); //calls the constructor og the parent class
       //this.open = something
    }
    open(){
      //you need to add an image to the popup and the corresponding 
    //image src attribute along with a caption for the image.
    }
}