// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeCardsContainer from './episode-cards-container';

test('EpisodeCardsContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeCardsContainer />).toJSON();
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
            recommended: [{url: '1'}, 
              {url: '2'}, 
              {url: '3'}, 
              {url: '4'},
            ]
          }),
        });
      });
      return p;
    });
  });
});
