export class Section {
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
    //Добавление элемента в контейнер
    addItem(element) {
        this._containerSelector.prepend(element);
    }
    //Отрисовка всех элементов
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }    
}