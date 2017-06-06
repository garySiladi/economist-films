// @flow

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST = 'history';
export const HISTORY_WATCH = 'history_watch';

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

export function getProgressTimeById(id: number) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const requiredEpisode = parsedData.find(episode => episode.episodeId === id);
    return requiredEpisode ? requiredEpisode.progressTime : 0;
  }
  return 0;
}

// export function saveLastWatched(sID: number, eID: number, isOver: boolean) {
//   if (typeof (localStorage) !== 'undefined') {
//     const currentHistory: ?string = localStorage.getItem(HISTORY_WATCH);
//     const parsedCurrentHistory = JSON.parse(currentHistory || 'null') || [];
//     const indexOfVideo = parsedCurrentHistory.findIndex(element => element.serieID === sID);
//     if (indexOfVideo === -1) {
//       parsedCurrentHistory.push({
//         serieID: sID,
//         episodeID: eID,
//         isVideoOver: isOver,
//       });
//     } else {
//       parsedCurrentHistory[indexOfVideo].episodeID = eID;
//       parsedCurrentHistory[indexOfVideo].isVideoOver = isOver;
//     }
//     localStorage.setItem(HISTORY_WATCH, JSON.stringify(parsedCurrentHistory));
//   }
// }
//
// export function getLastWatched(sID: number) {
//   const data: ?string = localStorage.getItem(HISTORY_WATCH);
//   const parsedData = JSON.parse(data || 'null');
//   if (parsedData) {
//     const requiredEpisode = parsedData.find(serie => serie.serieID === sID);
//     return requiredEpisode ? requiredEpisode.episodeID : 0;
//   }
//   return 0;
// }
//
// export function findIfOver(sID: number) {
//   const data: ?string = localStorage.getItem(HISTORY_WATCH);
//   const parsedData = JSON.parse(data || 'null');
//   if (parsedData) {
//     const requiredEpisode = parsedData.find(serie => serie.serieID === sID);
//     return requiredEpisode ? requiredEpisode.isVideoOver : false;
//   }
//   return false;
// }

export function getLastEpisodeID(eIDs: Array<number>) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const lastEpisode = parsedData.find(histEntry => eIDs.find(id => histEntry.episodeId === id));
    return lastEpisode ? lastEpisode.episodeId : 0;
  }
  return 0;
}
