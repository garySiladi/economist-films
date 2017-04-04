import { getRoot, getSeriesByID, getEpisodeByID, checkForNumber } from './fetch';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    const p = new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: () => ({
          id: 55,
          title: 'Dummy Title',
        }),
      });
    });
    return p;
  });
});

it('checks getRoot()', async () => {
  const response = await getRoot();
  expect(response.id).toBe(55);
  expect(response.title).toBe('Dummy Title');
});

it('checks getSeriesByID()', async () => {
  const response = await getSeriesByID(5);
  expect(response.id).toBe(55);
  expect(response.title).toBe('Dummy Title');
});

it('checks getEpisodeByID()', async () => {
  const response = await getEpisodeByID(5);
  expect(response.id).toBe(55);
  expect(response.title).toBe('Dummy Title');
});

it('checks checkForNumber()', () => {
  expect(() => checkForNumber('not a number')).toThrow('ID is not a number');
  expect(() => checkForNumber(16)).not.toThrow('ID is not a number');
});
