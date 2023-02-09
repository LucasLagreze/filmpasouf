import React, { createContext, createRef, useState } from 'react';
import { PlayerReference } from 'video-react';

interface VideoContextProps {
  playerRef: React.RefObject<PlayerReference>
}

export const VideoContext = createContext<VideoContextProps>({
  playerRef: createRef()
})

export const FilmProvider = ({ children }: { children: React.ReactNode }) => {
    const [playerRef, setPlayerRef] = useState<React.RefObject<PlayerReference>>(createRef());

    return (
        <VideoContext.Provider value={{playerRef}}>
            {children}
        </VideoContext.Provider>
    )
}
