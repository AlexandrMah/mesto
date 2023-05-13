class Section {
  constructor({ renderer }, container){
    this._renderer = renderer;
    this._container = container;
  }

  rendererItem({ items }) {  
    items.forEach((info) => {
      this._renderer(info);
    })
  }

  addItem(cardElement) {
    this._container.append(cardElement)
  }


  prependItem(cardElement) {
    this._container.prepend(cardElement)
  }
}

export default Section;
