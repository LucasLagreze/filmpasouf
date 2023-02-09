import { SetStateAction, useContext, useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react'
import { VideoContext } from '../../context/VideoContext'

interface KeywordsComponentProps {
  keywords: any
}

const KeywordsComponent: React.FC<KeywordsComponentProps> = ({ keywords }) => {

    const {playerRef} = useContext(VideoContext)
    const [currentTime, setCurrentTime] = useState(0);
    const [currentKeywords, setCurrentKeywords] = useState(null) as any

    useEffect(() => {
        if(playerRef.current){
        playerRef.current.subscribeToStateChange((state: { currentTime: SetStateAction<number> }) => {
            setCurrentTime(state.currentTime)
        })
        }
    }, [playerRef])

    useEffect(() => {
        const keywordsFound = keywords.findLast((kw: { pos: number }) => kw.pos <= currentTime);
        if (keywordsFound && keywordsFound.pos !== currentKeywords?.pos) {
            setCurrentKeywords(keywordsFound)
        }
    }, [currentKeywords, currentTime, keywords])

    const renderCurrentKeywords = () => {
        return (
            currentKeywords?.data.map((keyword: { url: string | undefined; title: boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | Key | null | undefined }) => 
                <a href={keyword.url} target="_blank" rel="noreferrer"><li className='keywords-list-element'>{keyword.title}</li></a>
            )
        )
    }


    return (
        <div>
            <h2>Keywords</h2>
            <ul className='keywords-list'>
                {renderCurrentKeywords()}
            </ul>
        </div>
    )
}

export default KeywordsComponent
