import moment from 'moment';
import {Filter} from './filter';
import {eventsData, eventsBlock, renderEventElements} from './events';

// Блок фильтров
const controlsBlock = document.querySelector(`.trip-controls`);
const controlsMenu = document.querySelector(`.trip-controls__menus`);
const filtersBlock = document.querySelector(`.trip-filter`);
// Фильтры
const filtersNames = [`Everything`, `Future`, `Past`];


// Генерируем данные о блоке фильтров
const getFilterBlockData = (names) => {
  const filterBlockData = {
    filters: []
  };
  for (const name of names) {
    const filter = {
      name,
      isChecked: false
    };
    filterBlockData.filters.push(filter);
  }
  return filterBlockData;
};

// Создаем блок фильтров
const createFilterBlockElement = (filter) => {
  const filterComponent = new Filter(filter);

  // Фильтруем эвенты
  filterComponent.onFilter = (evt) => {
    const filterName = evt.target.id;
    const filteredEventsData = filterEvents(eventsData, filterName);
    eventsBlock.innerHTML = ``;
    renderEventElements(filteredEventsData, eventsBlock);
  };

  const filterBlockElement = filterComponent.render();
  return filterBlockElement;
};

// Рендрим блок фильтров
const renderFilterBlockElement = (container) => {
  const filterBlockData = getFilterBlockData(filtersNames);
  const filterBlockElement = createFilterBlockElement(filterBlockData);
  container.appendChild(filterBlockElement);
};

// Функция фильтрации
const filterEvents = (events, filterName) => {
  switch (filterName) {
    case `filter-future`:
      return events.filter((event) =>
        event.startDate.isAfter(moment()));

    case `filter-past`:
      return events.filter((event) =>
        event.startDate.isBefore(moment()));
  }
  return events;
};

console.log(eventsData);

export {filtersBlock};
export {renderFilterBlockElement};
export {controlsMenu};
