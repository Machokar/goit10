import { fetchBreeds, fetchCatByBreed } from '../src/cat.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const info = document.querySelector('.cat-info');

errorMessage.setAttribute('hidden', 'true');

const setLoadingState = isLoading =>
  (loader.style.display = isLoading ? 'block' : 'none');
const setErrorState = hasError => {
  errorMessage.style.display = hasError ? 'block' : 'none';
  select.style.display = hasError ? 'none' : 'block';
};

const createOption = (value, text) =>
  Object.assign(document.createElement('option'), { value, textContent: text });

const fetchCatBreeds = async () => {
  try {
    const data = await fetchBreeds();
    data.forEach(breed =>
      select.appendChild(createOption(breed.id, breed.name))
    );
    select.style.display = 'block';
  } catch {
    setErrorState(true);
    select.style.display = 'none';
  } finally {
    setLoadingState(false);
  }
};

const displayCatInfo = async breedId => {
  setErrorState(false);
  setLoadingState(true);
  info.innerHTML = '';

  try {
    loader.classList.remove('is-hidden');
    const { url, breeds } = (await fetchCatByBreed(breedId))[0];
    const markup = `
      <div class="box-img">
        <img src="${url}" class="cat-size" alt="${breeds[0].name}"/>
      </div>
      <div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`;
    info.insertAdjacentHTML('beforeend', markup);
  } catch {
    onFetchError();
  } finally {
    setLoadingState(false);
    select.style.display = 'block';
  }
};

const onSelectBreed = event => displayCatInfo(event.target.value);

const onFetchError = () => {
  setLoadingState(true);
  Notify.failure(errorMessage.textContent, {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
};

const initializeApp = () => {
  select.appendChild(createOption('', 'Виберіть породу кота'));
  fetchCatBreeds();
  select.addEventListener('change', onSelectBreed);
};

initializeApp();
