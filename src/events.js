import moment from 'moment';

import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray} from './utils';
import {Event} from './event';
import {EventEdit} from './eventEdit';

const EVENT_DESTINATIONS = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const EVENT_DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const eventTypes = {
  "Taxi": `🚕`,
  "Bus": `🚌`,
  "Ship": `🛳️`,
  "Transport": `🚊`,
  "Drive": `🚗`,
  "Flight": `✈️`,
  "Check-in": `🏨`,
  "Sightseeing": `🏛️`,
  "Restaurant": `🍴`
};
const eventOffers = [
  {
    name: `Add luggage`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Switch to comfort class`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Add meal`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Choose seats`,
    price: getRandomNumber(0, 50)
  }
];
let eventsNumber = 7;

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Получаем данные об одной точке маршрута
const getEvent = () => {
  const event = {
    type: getRandomElement(Object.keys(eventTypes)),
    destination: getRandomElement(EVENT_DESTINATIONS),
    offers: getShuffledArray(eventOffers).slice(0, getRandomNumber(0, 3)),
    description: getRandomLengthArray(getShuffledArray(EVENT_DESCRIPTIONS)).slice(1, getRandomNumber(2, 5)).join(` `),
    price: getRandomNumber(10, 500),
    image: `http://picsum.photos/300/150?r=${Math.random()}`,
    startDate: new Date(),
    endDate: new Date()
  };

  event.startDate = moment(event.startDate)
  .add(getRandomNumber(-60, 0), `minutes`)
  .add(getRandomNumber(-2, 0), `hours`);

  event.endDate = moment(event.endDate)
  .add(getRandomNumber(0, 60), `minutes`)
  .add(getRandomNumber(0, 2), `hours`);

  return event;
};

// Получаем данные о нескольких точках марщрута
const getEvents = (number) => {
  const events = [];
  for (let i = 0; i < number; i++) {
    events.push(getEvent());
  }
  return events;
};

// Вставляем разметку точек маршрута
const fillEventsBlock = (eventsHtml) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, eventsHtml.join(``));
};

// Создаем карточку на основании данных
const createEventElement = (event) => {
  // Создаем классы на основе данных
  const eventComponent = new Event(event);
  const editEventComponent = new EventEdit(event);

  // Меняем состояние
  eventComponent.onEdit = () => {
    editEventComponent.render();
    eventsBlock.replaceChild(editEventComponent.element, eventComponent.element);
    eventComponent.unrender();
  };

  // Меняем состояние
  editEventComponent.onSubmit = (newObject) => {
    event.price = newObject.price;
    event.destination = newObject.destination;
    event.type = newObject.type;
    event.startDate = newObject.startDate;
    event.endDate = newObject.endDate;
    eventComponent.update(event);
    eventComponent.render();
    eventsBlock.replaceChild(eventComponent.element, editEventComponent.element);
    editEventComponent.unrender();
  };

  // Создаем карточку
  const eventElement = eventComponent.render();

  return eventElement;
};

// Создаем несколько элементов
const createEventElements = (events) => {
  const fragment = document.createDocumentFragment();
  events.forEach((event) => {
    const eventElement = createEventElement(event);
    fragment.appendChild(eventElement);
  });

  return fragment;
};

// Рендрим элементы в нужном месте
const renderEventElements = (container) => {
  const events = getEvents(getRandomNumber(0, 7));
  const eventElements = createEventElements(events);
  container.appendChild(eventElements);
};
// Удаляем точки маршрута и вставляем новые
const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  renderEventElements(eventsBlock);
};

export {eventTypes, fillEventsBlock, getEvent, getEvents, eventsNumber, filtersBlockClickHandler, eventsBlock, renderEventElements};
