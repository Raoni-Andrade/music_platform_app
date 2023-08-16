const { song } = props;
const { previewURL } = song;

const initialState = {
  isPlaying: false,
  currentTime: 0,
  audioSrc: { previewURL }, // Replace with your audio file path
  volume: 1,
};

const audioPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'PLAY':
    return { ...state, isPlaying: true };
  case 'PAUSE':
    return { ...state, isPlaying: false };
  case 'STOP':
    return { ...state, isPlaying: false, currentTime: 0 };
  case 'UPDATE_CURRENT_TIME':
    return { ...state, currentTime: action.payload };
  default:
    return state;
  }
};

export default audioPlayerReducer;
