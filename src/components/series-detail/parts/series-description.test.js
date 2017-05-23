// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SeriesDescription from './series-description';

test('SeriesDescription renders with data', () => {
  const tree : string = renderer.create(
    <SeriesDescription
      backgroundUrl="xxx"
      description="aaa"
      seriesLogoUrl="yyy"
      sponsorLogoUrl="zzz"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
