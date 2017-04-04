// @flow
function constructFetch(type: string, id: ?number) {
  const urlString = id ? `${type}/${id}` : type;
  return fetch(`
    https://economist.twivel.io/api/v1/${urlString}/json`, {
      method: 'GET',
    })
  .then(response => response.json())
  .catch(err => err);
}

export function getRoot() {
  return constructFetch('root');
}

export function getEpisodeByID(id: number) {
  return constructFetch('episode', id);
}

export function getSeriesByID(id: number) {
  return constructFetch('series', id);
}
