// @flow
import React from 'react';
import './series-container.css';
import { getSeriesByID } from '../../api/fetch';
import SeriesDescription from './parts/series-description';

type SeriesContainerProps = {
  params: {
    id: number,
  }
};
type SeriesContainerState = {
  series: ?{
    description: string,
    additional_assets: [
      {
        file: {
          url: string,
        },
      },
      {
        file: {
          url: string,
        },
      },
      {
        file: {
          url: string,
        },
      }
    ]
  }
};

class SeriesContainer extends React.Component {// eslint-disable-line
  constructor(props: SeriesContainerProps) {
    super(props);

    this.state = {
      series: null,
    };
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id).then((series) => {
      this.setState({ series });
    });
  }
  render() {
    const { series } = this.state;
    return series ? (
      <div className="series-container">
        <SeriesDescription
          backgroundUrl={series.additional_assets[0].file.url}
          description={series.description}
          seriesLogoUrl={series.additional_assets[1].file.url}
          sponsorLogoUrl={series.additional_assets[2].file.url}
        />
      </div>
    ) : null;
  }
}

export default SeriesContainer;
