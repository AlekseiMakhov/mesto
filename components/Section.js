export default class Section {
    constructor ( 
        {
            items, 
            renderer 
        },
        containerSelector
    ) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }

    renderItems() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }    
}