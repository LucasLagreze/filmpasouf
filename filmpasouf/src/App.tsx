import { useState } from 'react'
import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import VideoPlayer from './components/video/video';
import Chapter from './components/chapter/Chapter'
import './App.css'
import MapComponent from './components/map';

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
        <div>
          <MapComponent center={[45.1699981689, 1.5633200407]} zoom={13} />
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
