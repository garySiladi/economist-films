// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDescriptionContainer from './episode-description-container';

test('EpisodeDescriptionContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDescriptionContainer />).toJSON();
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
            title: 'some title', 
            date: '2011-11-11', 
            description: 'something happened', 
          }),
        });
      });
      return p;
    });
  });
});
