import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_2ajD55nqGLT5Yba49UY23lFIHOC4uo8LjFOgSupvNjOFE2JyJUNhLh3wY2DArirZ';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds';
const END_POINT_IMAGES = 'images/search';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}${END_POINT_BREEDS}`);
}
export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}${END_POINT_IMAGES}?breed_ids=${breedId}`);
}
