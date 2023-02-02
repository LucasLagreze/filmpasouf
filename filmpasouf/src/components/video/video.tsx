import React, { useState, useRef, useEffect } from 'react';

interface Props {
  videoUrl: string
  timeToJump: number
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, timeToJump }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime)
        }
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isPlaying])

  const handleJumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
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
        width='100%'
      />
      <button onClick={() => handleJumpToTime(timeToJump)}>Go To</button>
      {isPlaying ? <p>Video is playing</p> : <p>Video is paused</p>}
      <p>Current time: {currentTime} seconds</p>
    </div>
  )
}

export default VideoPlayer