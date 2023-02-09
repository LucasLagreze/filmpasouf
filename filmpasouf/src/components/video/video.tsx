import React, { useEffect, useContext } from 'react'
import {Player} from 'video-react'
import { VideoContext } from '../../context/VideoContext'

interface Props {
  videoUrl: string
  timeToJump: number
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, timeToJump }) => {
  const {playerRef} = useContext(VideoContext)

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.currentTime = timeToJump
      console.log(playerRef.current.currentTime)
    }
  }, [timeToJump])

  return (
    <div>
      <Player
        ref={playerRef}
        playsInline
        src={videoUrl}
      />
    </div>
  )
}

export { VideoPlayer }
