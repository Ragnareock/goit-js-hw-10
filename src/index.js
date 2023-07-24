import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './css/styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectedEl = document.querySelector('.breed-select');
const optionEl = document.querySelector('.breed-select option');
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');

selectedEl.classList.add('hidden');
selectedEl.setAttribute('id', 'slim-select');
optionEl.setAttribute('selected', 'selected');
optionEl.setAttribute('disabled', 'disabled');
optionEl.textContent = 'Make your choice';

selectedEl.addEventListener('change', onSelect);

function onSelect(event) {
  loaderEl.classList.remove('hidden');
  infoEl.innerHTML = '';

  fetchCatByBreed(event.target.value)
    .then(response => {
      createCardMarkup(response.data[0].breeds[0], response.data[0]);
      loaderEl.classList.add('hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loaderEl.classList.add('hidden');
    })
    .finally();
}

fetchBreeds()
  .then(response => {
    createOptionsMarkup(response.data);
    new SlimSelect({
      select: '#slim-select',
    });
    selectedEl.classList.remove('hidden');
    loaderEl.classList.add('hidden');
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    loaderEl.classList.add('hidden');
  })
  .finally();

function createOptionsMarkup(arr) {
  return arr.forEach(({ name, id }) => {
    let optionsMarkup = `<option value="${id}">${name}</option>`;
    selectedEl.insertAdjacentHTML('beforeend', optionsMarkup);
  });
}

function createCardMarkup({ name, description, temperament }, { url }) {
  let cardMarkup = `
    <img src="${url}" alt="${name}" width="480px"/>
    <div>
    <h1>${name}</h1>
    <p>${description}</p>
    <p><span>Temperament: </span>${temperament}.</p>
    </div>`;

  infoEl.innerHTML = cardMarkup;
}
