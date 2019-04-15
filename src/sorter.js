import {Component} from './component';

class Sorter extends Component {
  constructor(data) {
    super();
    this._sorters = data.sorters;

    this._onSorter = this._onSorter.bind(this);
  }

  _getSorters(sorters) {
    const sortersHtml = [];
    for (const sorter of sorters) {
      const sorterHtml = `
        <input type="radio" name="trip-sorting" id="sorting-${sorter.name.toLowerCase()}" value="${sorter.name.toLowerCase()}" ${sorter.isChecked ? `checked` : ``}>
        <label class="trip-sorting__item trip-sorting__item--${sorter.name.toLowerCase()}" for="sorting-${sorter.name.toLowerCase()}">${sorter.name}</label>
    `.trim();
      sortersHtml.push(sorterHtml);
    }
    return sortersHtml.join(``);
  }

  _onSorter(evt) {
    evt.preventDefault();

    if (typeof this._onSorter === `function`) {
      this._onSorter();
    }
  }

  set onSorter(fn) {
    this._onSorter = fn;
  }

  get template() {
    return `
    <form class="trip-sorting">
    ${this._getSorters(this._sorters)}
    <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
  </form>
  `.trim();
  }

  unbind() {
    this._element.addEventListener(`change`, this._onSorter);
  }

  bind() {
    this._element.addEventListener(`change`, this._onSorter);
  }
}

export {Sorter};
