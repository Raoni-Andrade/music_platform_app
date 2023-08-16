export const play = () => ({
  type: 'PLAY',
});

export const pause = () => ({
  type: 'PAUSE',
});

export const stop = () => ({
  type: 'STOP',
});

export const updateCurrentTime = (currentTime) => ({
  type: 'UPDATE_CURRENT_TIME',
  payload: currentTime,
});
