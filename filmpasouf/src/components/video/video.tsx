import React, { useState, useRef } from 'react';

interface Props {
  videoUrl: string
  timeToJump: number
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, timeToJump }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleJumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button onClick={() => handleJumpToTime(timeToJump)}>Go To</button>
      {isPlaying ? <p>Video is playing</p> : <p>Video is paused</p>}
    </div>
  )
}

export default VideoPlayer