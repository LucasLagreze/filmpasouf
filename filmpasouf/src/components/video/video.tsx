import React, { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
    handleJumpToTime(timeToJump)
  }, [timeToJump])

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width='100%'
      />
    </div>
  )
}

export default VideoPlayer