// @flow

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST: string = 'history';

export function saveVideoProgress(id: number, progress: number) {
  if (typeof (localStorage) !== 'undefined') {
    const currentHistory: ?string = localStorage.getItem(HISTORY_LIST);
    const videoProgressObject: VideoProgressType = { episodeId: id, progressTime: progress };
    if (currentHistory) {
      // $FlowFixMe
      const indexOfVideo = currentHistory.findIndex(element => element.episodeId === id);
      if (indexOfVideo === -1) {
        // $FlowFixMe
        currentHistory.push(videoProgressObject);
        localStorage.setItem(HISTORY_LIST, JSON.stringify(currentHistory));
      } else {
        // $FlowFixMe
        currentHistory.splice(indexOfVideo, 1, videoProgressObject);
        localStorage.setItem(HISTORY_LIST, JSON.stringify(currentHistory));
      }
    } else {
      localStorage.setItem(HISTORY_LIST, JSON.stringify(videoProgressObject));
    }
  }
}

export function getProgressTimeById(id: number) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  if (data) {
    // $FlowFixMe
    const requiredEpisode = data.find(episode => episode.episodeId === id);
    return requiredEpisode ? requiredEpisode.progressTime : null;
  }
  return null;
}
