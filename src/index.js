import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onBreedSelect);
breedSelect.setAttribute('id', 'slim-select');

function onBreedSelect(e) {
  fetchCatByBreed(e.target.value)
    .then(response => {
      console.log(response.data[0]);
      makeMarkCard(response.data[0].breeds[0], response.data[0]);
    })
    .catch(error => {})
    .finally();
}

fetchBreeds()
  .then(response => {
    makeMarkOptions(response.data);
    new SlimSelect({
      select: '#slim-select',
    });
  })
  .catch(error => {})
  .finally();

function makeMarkOptions(arr) {
  return arr.forEach(({ name, id }) => {
    let markUp = `<option value="${id}">${name}</option>`;
      breedSelect.insertAdjacentHTML('beforeend', markUp);
  });
}

function makeMarkCard({ name, description, temperament }, { url }) {
  let markUp = `
    <img src="${url}" alt="${name}" width="460px"/>
    <div class="descrp-card">
    <p class="title-card">${name}</p>
    <p class="description">${description}</p>
    <p class="temerament">${temperament}</p>
    </div>`;
    catInfo.innerHTML = markUp;
}
