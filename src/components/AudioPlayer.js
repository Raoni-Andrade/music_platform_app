import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function AudioPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const { song } = props;
  const { previewUrl } = song;

  const audioSrc = previewUrl; // Replace with your audio file path

  const handlePlay = () => {
    console.log(props);
    console.log(audioSrc);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div className="bg-gray-200 p-4">
      <audio controls ref={ audioRef } src={ audioSrc } onTimeUpdate={ handleTimeUpdate } />
      <div className="flex items-center mt-4">
        {/* <button className="mr-2" onClick={ handlePlay } disabled={ isPlaying }>
          Play
        </button>
        <button className="mr-2" onClick={ handlePause } disabled={ !isPlaying }>
          Pause
        </button>
        <button onClick={ handleStop } disabled={ !isPlaying }>
          Stop
        </button> */}
      </div>
      <div className="mt-2">
        Current Time:
        {' '}
        {currentTime.toFixed(2)}
        {' '}
        seconds
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  song: PropTypes.PropTypes.shape().isRequired,
  previewUrl: PropTypes.string,
}.isRequired;

export default AudioPlayer;
