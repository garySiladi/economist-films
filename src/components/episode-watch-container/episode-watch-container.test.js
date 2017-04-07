// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeWatchContainer from './episode-watch-container';

test('EpisodeWatchContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeWatchContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Checking fetch function: ', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise((resolve) => {
        resolve({
          ok: true,
          status: 200,
          json: () => ({
            url: 'http',
          }),
        });
      });
      return p;
    });
  });
});