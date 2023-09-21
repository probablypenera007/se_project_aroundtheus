export default class Section{
    constructor({items, renderer}, containerSelector ){
       this._items = items;
       this._renderer = renderer;
       this._containerSelector = document.querySelector(containerSelector);
       //this CSS class selector is where you'll add the card elements
    }
    renderItems(){
        //public method that renders all elements on the page,
       this._items.forEach((item) => {
       const cardElement = this._renderer(item);
    
       });
    }
    addItem(element)
    {
     this._containerSelector.append(element);   //public method, takes a DOM element
        //and adds it to the container
    };
}
