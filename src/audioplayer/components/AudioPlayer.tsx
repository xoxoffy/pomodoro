import React, { useRef, useState } from 'react';
import workMusic from '../../assets/workMusic.mp3';
import breakMusic from '../../assets/breakMusic.mp3';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const pomodoroState = useSelector((state: any) => state.timer.pomodoroState);

  console.log(pomodoroState);

  // const music = pomodoroState === 'work' && workMusic;

  const audioRef = useRef(new Audio(breakMusic));
  const play = () => {
    setIsPlaying(true);
    audioRef.current.volume = 0.1;
    audioRef.current.play();
  };
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playPause = isPlaying ? pause : play;

  return (
    <div>
      <h1>Muzyczka</h1>
      {!isPlaying ? (
        <FaPlay onClick={playPause} />
      ) : (
        <FaPause onClick={playPause} />
      )}
    </div>
  );
};

export default AudioPlayer;
