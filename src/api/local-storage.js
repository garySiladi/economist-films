// @flow
import _ from 'lodash';

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST = 'history';

export function saveVideoProgress(id: number, progress: number) {
  if (typeof (localStorage) !== 'undefined') {
    const currentHistory: ?string = localStorage.getItem(HISTORY_LIST);
    const parsedCurrentHistory = JSON.parse(currentHistory || 'null') || [];
    const indexOfVideo = parsedCurrentHistory.findIndex(element => element.episodeId === id);
    if (indexOfVideo === -1) {
      parsedCurrentHistory.push({
        episodeId: id,
        progressTime: progress,
      });
    } else {
      parsedCurrentHistory[indexOfVideo].progressTime = progress;
    }
    localStorage.setItem(HISTORY_LIST, JSON.stringify(parsedCurrentHistory));
  }
}

let counter = 0;

export function getProgressTimeById(id: number) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const requiredEpisode = parsedData.find(episode => episode.episodeId === id);
    return requiredEpisode ? requiredEpisode.progressTime : 0;
  }
  return 0;
}

export function getLastWatchedEpisodeID(episodeIDs: Array<number>) {
  const endBoundary = 95;
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const episodesCount = episodeIDs.length;
    const commonEpisodes =
      parsedData.filter(episode => episodeIDs.find(ids => (ids === episode.episodeId)));
    const mappedParsedData = commonEpisodes.filter(video => video.progressTime >= 95);
    if (mappedParsedData.length === episodesCount) {
      const differentEpisodes = _.differenceBy(parsedData, commonEpisodes, 'episodeId');
      localStorage.setItem(HISTORY_LIST, JSON.stringify(differentEpisodes));
    }
  }
  const firstEpisode = episodeIDs[0];
  const lastFinishedId = episodeIDs[counter];
  const lastEpisode =
    parsedData.find(histEntry => histEntry.episodeId === lastFinishedId);
  if (lastEpisode) {
    if (lastEpisode.progressTime < endBoundary) {
      return lastFinishedId || firstEpisode;
    }
    counter += 1;
    return episodeIDs[counter] || firstEpisode;
  }
  return lastFinishedId || firstEpisode;
}
