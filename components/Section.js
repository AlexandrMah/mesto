class Section {
  constructor({ items, renderer }, container){
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  render() {
    this._placeName.textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    this._setEventListeners();

    return(this._view);
  }
}

export default Section;