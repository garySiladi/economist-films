function constructFetch(type, id) {
  let urlString = type;
  if (id) urlString = urlString.concat('/', id);
  return fetch(`
    https://economist.twivel.io/api/v1/${urlString}/json`, {
      method: 'GET',
    })
  .then(response => response.json());
}

export function checkForNumber(id) {
  if (typeof id !== 'number') {
    throw Error('ID is not a number');
  }
}

export function getRoot() {
  return constructFetch('root');
}

export function getEpisodeByID(id) {
  checkForNumber(id);
  return constructFetch('episode', id);
}

export function getSeriesByID(id) {
  checkForNumber(id);
  return constructFetch('series', id);
}
