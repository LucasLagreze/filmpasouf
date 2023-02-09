import { useContext, useState } from 'react'
import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import VideoPlayer from './components/video/video';
import Chapter from './components/chapter/Chapter'
import './App.css'
import MapComponent from './components/map/map';
import ChatView from './components/chatview/chatview';

export default function App() {
  const { isLoading, error, response } = useGetDatas()
  const [chapterTime, setChapterTime] = useState<number>(0)

  const onDataChange = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (error) {
      return <Text>{error}</Text>
    }

    let chapterList = response.Chapters.map((chapter: any) => {
      return {
        id: parseInt(chapter.pos),
        title: chapter.title,
        pos: parseInt(chapter.pos)
      }
    })
    
    return (
      <div>
        <div className="top">
          <div className="video__container">
            <VideoPlayer videoUrl={response.Film.file_url} timeToJump={chapterTime} />
          </div>
          <div className="chapter__container">
            <FlatList
              data={chapterList}
              renderItem={({ item }) => <Chapter id={item.id} title={item.title} pos={item.pos} onClick={(id) => setChapterTime(id)} />}
              keyExtractor={item => item.id}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="map__container">
            <MapComponent waypoint={response.Waypoints} zoom={13}/>
          </div>
          <div className="chat__container">
            <ChatView onClick={(id) => setChapterTime(id)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <View>
      {onDataChange()}
    </View>
  )
}
