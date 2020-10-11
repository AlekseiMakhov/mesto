export class Section {
    constructor ( 
        {
            renderer
        },
        containerSelector
    ) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }
    //Добавление элемента в контейнер
    addItem(element) {
        this._containerSelector.prepend(element);
    }
    //Отрисовка всех элементов
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }    
}