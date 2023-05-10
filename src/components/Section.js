class Section {
  constructor({ items, renderer }, container){
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  rendererItem() {  
    this._items.forEach((info) => {
      this._renderer(info);
    })
  }

  addItem(cardElement) {
    this._container.append(cardElement)
  }
}

export default Section;