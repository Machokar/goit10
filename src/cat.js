const api_key =
  'live_7Ggq9CS1s0Wi7JBMrXwBuoah1GSJaJEinh8obzcT1hkVvM7GzANt1QiJh6hKuGKA';

export function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  return fetch(apiUrl).then(response => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch breeds. Status: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  });
}

export function fetchCatByBreed(id) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&api_key=${api_key}`;
  return fetch(apiUrl).then(response => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch breeds. Status: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  });
}
