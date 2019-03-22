const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomLengthArray = (array) => {
  return array.slice(Math.floor(Math.random() * array.length));
};
const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getRandomBoolean = () => Math.random() >= 0.5;
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
export {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, createElement, getRandomBoolean};
