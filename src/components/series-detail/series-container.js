// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import Slider from '../slider/slider';
import SidePanel from '../side-panel/side-panel';
import EpisodeSelected from '../episode-selected/episode-selected';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';
import SeriesDescription from './parts/series-description';
import UserIcon from '../../../public/assets/user-1.gif';

export type SeriesContainerProps = {
  params: {
    id: number,
  },
  location: {
    query: {
      expandedEpisode: string,
    },
  },
};
type PublishedEpisodeType = {
  id: number,
  series_id: number,
  thumbnail: {
    url: string,
  },
  title: string,
  subtitle: string,
  description: string,
  video_url: string,
};
type SeriesType = {
  title: string,
  description: string,
  additional_assets: [
    {
      key: string,
      file: {
        url: string,
      },
    },
    {
      key: string,
      file: {
        url: string,
      },
    },
    {
      key: string,
      file: {
        url: string,
      },
    },
  ],
  published_episodes: Array<PublishedEpisodeType>
};
type SeriesContainerState = {
  series: ?SeriesType,
  selectedEpisode: number,
  isSliderSelected: boolean,
  isSideBarSelected: boolean,
  isEpisodeDetailSelected: boolean,
  goToEpisodeDetail: boolean,
  isWatchnowBtnSelected: boolean,
};

class SeriesContainer extends React.Component {
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      series: null,
      selectedEpisode: 0,
      isSliderSelected: true,
      isSideBarSelected: false,
      goToEpisodeDetail: false,
      isEpisodeDetailSelected: false,
      isWatchnowBtnSelected: false,
    };
    (this: any).handleKeyPress = (this: any).handleKeyPress.bind(this);
    (this: any).handleExpand = (this: any).handleExpand.bind(this);
    (this: any).handleReturnFromEpisode = (this: any).handleReturnFromEpisode.bind(this);
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      const expandedEpisodeId = Number(this.props.location.query.expandedEpisode);
      const foundPosition = series.published_episodes.findIndex(
      episode => episode.id === expandedEpisodeId);
      this.setState({
        series,
        selectedEpisode: foundPosition < 0 ? 0 : foundPosition,
      });
    })
    .catch(err => err);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.handleExpand();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleExpand() {
    if (this.props.location.query.expandedEpisode) {
      this.setState({
        goToEpisodeDetail: true,
      });
    }
  }
  handleReturnFromEpisode() {
    this.setState({ goToEpisodeDetail: false });
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      series,
      goToEpisodeDetail,
      selectedEpisode,
      isSliderSelected,
      isSideBarSelected,
      isWatchnowBtnSelected,
    } = this.state;
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        if (isSliderSelected && selectedEpisode !== 0 && !goToEpisodeDetail) {
          this.setState({
            selectedEpisode: selectedEpisode - 1,
          });
        } if (selectedEpisode === 0 || isWatchnowBtnSelected) {
          this.setState({
            isSliderSelected: false,
            isSideBarSelected: true,
            goToEpisodeDetail: false,
            isWatchnowBtnSelected: false,
          });
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (isSliderSelected && series &&
          selectedEpisode < series.published_episodes.length - 1 && !goToEpisodeDetail) {
          this.setState({
            selectedEpisode: selectedEpisode + 1,
          });
        } if (isSideBarSelected) {
          this.setState({
            isSliderSelected: true,
            isSideBarSelected: false,
          });
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isSliderSelected && !isSideBarSelected) {
          this.setState({
            isSliderSelected: false,
            isWatchnowBtnSelected: true,
          });
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (isWatchnowBtnSelected && !isSideBarSelected) {
          this.setState({
            isSliderSelected: true,
            isWatchnowBtnSelected: false,
          });
        }
        break;
      case 'Enter':
        if (isSliderSelected) {
          this.setState({ goToEpisodeDetail: true });
          window.scrollTo(0, window.document.body.scrollHeight);
        }
        break;
      case 'Backspace':
        browserHistory.goBack();
        break;
      default:
    }
  }
  render() {
    const {
      series,
      selectedEpisode,
      isSliderSelected,
      isSideBarSelected,
      goToEpisodeDetail,
      isWatchnowBtnSelected,
    } = this.state;
    const assetKeys = ['eco_background', 'eco_detail_logo', 'eco_sponsor_logo'];
    const [
      backgroundAsset,
      logoAsset,
      sponsorAsset,
    ] = assetKeys.map(key => series ? series.additional_assets.find(
        asset => asset.key === key,
      ) : null,
    );
    const backgroundStyle = backgroundAsset ? {
      background: `url(${backgroundAsset.file.url}) top center no-repeat`,
    } : null;
    const selectedEpisodeData = series && series.published_episodes[selectedEpisode];
    const seriesDescriptionContainer = series ? (
      <SeriesDescription
        isWatchnowBtnSelected={isWatchnowBtnSelected}
        description={series.description}
        seriesLogoUrl={logoAsset ? logoAsset.file.url : null}
        sponsorLogoUrl={sponsorAsset ? sponsorAsset.file.url : null}
      />
    ) : null;
    const episodeDetailsContainer = goToEpisodeDetail && selectedEpisodeData ? (
      <EpisodeSelected
        id={selectedEpisodeData.id}
        key={selectedEpisodeData.id}
        url={selectedEpisodeData.thumbnail.url}
        title={selectedEpisodeData.title}
        subtitle={selectedEpisodeData.subtitle}
        description={selectedEpisodeData.description}
        closePopupFunction={this.handleReturnFromEpisode}
        videoUrl={selectedEpisodeData.video_url}
        seriesId={selectedEpisodeData.series_id}
        isSelectedHomeContainer={false}
      />
    ) : null;
    const slider = series ? (
      <Slider
        data={series.published_episodes}
        className="home-slider"
        sliderTitle={series.title}
        key={series.title}
        isSelected={isSliderSelected}
        selectedEpisode={selectedEpisode}
      />
    ): null;
    return (
      <div className="series-container" style={backgroundStyle}>
        <SidePanel
          isSelected={isSideBarSelected}
          user={{ id: 1, name: 'Profile Name', imgUrl: UserIcon }}
        />
        <div className="series-content">
          {seriesDescriptionContainer}
          {slider}
          {episodeDetailsContainer}
        </div>
      </div>
    );
  }
}

export default SeriesContainer;
