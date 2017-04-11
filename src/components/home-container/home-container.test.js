// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HomeContainer from './home-container';
import * as API from '../../api/fetch';

const mockData1 = {
  shelves: [
    {
      title: 'Not All series',
      items: [
        {
          id: 1,
          title: 'xxx',
          type: 'yyy',
        },
        {
          id: 2,
          title: 'aaa',
          type: 'bbb',
        }
      ],
    },
    {
      title: 'Recommended',
      items: [
        {
          id: 3,
          title: 'xxx',
          type: 'yyy',
        },
        {
          id: 4,
          title: 'aaa',
          type: 'bbb',
        }
      ],
    }
  ],
};

const mockData2 = {
  shelves: [
    {
      title: 'All series',
      items: [
        {
          id: 1,
          title: 'xxx',
          type: 'yyy',
        },
        {
          id: 2,
          title: 'aaa',
          type: 'bbb',
        }
      ],
    },
    {
      title: 'Recommended',
      items: [
        {
          id: 3,
          title: 'xxx',
          type: 'yyy',
        },
        {
          id: 4,
          title: 'aaa',
          type: 'bbb',
        }
      ],
    }
  ],
};

describe('HomeContainer: ', () => {
  // $FlowFixMe
  API.getRoot = jest.fn()
  .mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(mockData1);
    })
  )
  .mockReturnValue(
    new Promise((resolve) => {
      resolve(mockData2);
    })
  )

  test('renders correctly without All series', () => {
    const tree : string = renderer.create(<HomeContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with All series', () => {
    const tree : string = renderer.create(<HomeContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('findSeriesByTitle returns correct object', () => {
    const result = HomeContainer.findSeriesByTitle('xxx', [{ title: 'xxx' }, { title: 'xzx' }]);
    expect(result).toMatchObject({ title: 'xxx' });
  });

  test('findSeriesByTitle returns null', () => {
    const result = HomeContainer.findSeriesByTitle('xxx', [{ title: 'xyx' }, { title: 'xzx' }]);
    expect(result).toBe(undefined);
  });
});
