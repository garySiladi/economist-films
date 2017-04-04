// @flow
import React from 'react';
import EpisodeDescription from './episode-description/episode-description';
import { EpisodeDescriptionStructure } from '../../structures/episode';

class EpisodeDescriptionContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '...loading...',
      date: '...loading...',
      description: '...loading...',
    };
  }
  state: EpisodeDescriptionStructure;
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const REST_API : string = 'https://economist.twivel.io/api/v1/root/json';
    fetch(REST_API)
      .then(response => response.json())
      .then((data) => {
        const firstItemObj : Object = data.shelves.map(
          shelve => shelve.items.map(item => item),
        )
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter((curr, index) => index === 1)
        .pop();
        console.log(firstItemObj.title);
        const title : string = firstItemObj.title;
        const date : string = firstItemObj.created_at.split(' ')[0];
        const description : string = firstItemObj.description;
        this.setState({
          title,
          date,
          description,
        });
      });
  }
  render() {
    const { title, date, description } = this.state;
    return (
      <EpisodeDescription title={title} date={date} description={description} />
    );
  }
}

export default EpisodeDescriptionContainer;
