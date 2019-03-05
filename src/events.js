import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomMapElement} from './utils';
const eventTypes = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🛳️`],
  [`Transport`, `🚊`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check`, `🏨`],
  [`Sightseeing`, `🏛️`],
  [`Restaurant`, `🍴`]
]);
const EVENT_DESTINATIONS = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const EVENT_OFFERS = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const EVENT_DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
let eventsNumber = 7;

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Получаем данные об одной точке маршрута
const getEvent = () => {
  const event = {
    type: getRandomMapElement(eventTypes),
    destination: getRandomElement(EVENT_DESTINATIONS),
    offers: getShuffledArray(EVENT_OFFERS).slice(0, getRandomNumber(0, 3)),
    description: getRandomLengthArray(getShuffledArray(EVENT_DESCRIPTIONS)).slice(1, getRandomNumber(2, 5)).join(` `),
    price: getRandomNumber(10, 500),
    image: `http://picsum.photos/300/150?r=${Math.random()}`
  };
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

// Генерируем офферы
const getEventOffersHtml = (offers) => {
  let offerElements = [];
  for (const offer of offers) {
    const newOfferElement = `
    <li>
    <button class="trip-point__offer">${offer} +&euro; ${getRandomNumber(0, 50)}</button>
    </li>
    `;
    offerElements.push(newOfferElement);
  }
  return offerElements.join(``);
};

// Создаем разметку точек маршрута
const getEventElementsHtml = (events) => {
  const eventElementsHtml = [];
  for (const event of events) {
    const eventElementHtml = `
    <article class="trip-point">
      <i class="trip-icon">${event.type[1]}</i>
      <h3 class="trip-point__title">${event.destination}</h3>
       <p class="trip-point__schedule">
          <span class="trip-point__timetable">10:00&nbsp;&mdash;11:30</span>
          <span class="trip-point__duration">1h 30m</span>
       </p>
       <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
       <ul class="trip-point__offers">
          ${getEventOffersHtml(event.offers)}
      </ul>
      </article>
      `;
      eventElementsHtml.push(eventElementHtml);
  }
  return eventElementsHtml;
};

// Вставляем разметку точек маршрута
const fillEventsBlock = (eventsHtml) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, eventsHtml.join(``));
};

// Удаляем точки маршрута и вставляем новые
const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  const newEvents = getEvents(getRandomNumber(0, 7));
  const newEventsHtml = getEventElementsHtml(newEvents);
  fillEventsBlock(newEventsHtml);
};

export {fillEventsBlock, getEvents, eventsNumber, getEventElementsHtml, filtersBlockClickHandler};
