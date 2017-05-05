// @flow

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST = 'history';

export function saveVideoProgress(id: number, progress: number) {
  if (typeof (localStorage) !== 'undefined') {
    const currentHistory: ?string = localStorage.getItem(HISTORY_LIST);
    const videoProgressObject: VideoProgressType = { episodeId: id, progressTime: progress };
    let historyObj = videoProgressObject;
    if (currentHistory) {
      // $FlowFixMe
      const indexOfVideo = currentHistory.findIndex(element => element.episodeId === id);
      if (indexOfVideo === -1) {
        // $FlowFixMe
        currentHistory.push(videoProgressObject);
        historyObj = currentHistory;
      } else {
        historyObj = currentHistory;
        // $FlowFixMe
        historyObj[indexOfVideo] = videoProgressObject;
      }
    }
    localStorage.setItem(HISTORY_LIST, JSON.stringify(historyObj));
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
