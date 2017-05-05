import {
  saveVideoProgress,
  getProgressTimeById,
} from './local-storage';

const localStorageData = {
  history: [
    {
      episodeId: 1,
      progressTime: 55,
    },
  ],
};

describe('localStorage with data', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem: jest.fn(key => localStorageData[key] || null),
      setItem: jest.fn(),
    };
  });
  test('getItem', () => {
    let progress = getProgressTimeById(1);
    expect(window.localStorage.getItem.mock.calls.length).toEqual(1);
    expect(window.localStorage.getItem.mock.calls[0]).toEqual(['history']);
    expect(progress).toBe(55);
    progress = getProgressTimeById(2);
    expect(progress).toBe(null);
  });
  test('setItem', () => {
    saveVideoProgress(5, 60);
    expect(window.localStorage.setItem.mock.calls.length).toEqual(1);
    expect(window.localStorage.setItem.mock.calls[0]).toEqual(['history', JSON.stringify(localStorageData.history)]);
    saveVideoProgress(1, 70);
    expect(window.localStorage.setItem.mock.calls.length).toEqual(2);
    expect(window.localStorage.setItem.mock.calls[1]).toEqual(['history', JSON.stringify(localStorageData.history)]);
  });
});

describe('localStorage without history', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
    };
  });
  test('saveVideoProgress', () => {
    saveVideoProgress(1, 60);
    expect(window.localStorage.setItem.mock.calls.length).toEqual(1);
    expect(window.localStorage.setItem.mock.calls[0]).toEqual(['history', JSON.stringify({ episodeId: 1, progressTime: 60 })]);
  });
  test('getProgressTimeById', () => {
    expect(getProgressTimeById(1)).toEqual(null);
  });
});

describe('undefined localStorage', () => {
  beforeEach(() => { window.localStorage = undefined; });
  test('saveVideoProgress', () => {
    saveVideoProgress(1, 60);
  });
});

