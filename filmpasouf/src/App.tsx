import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import VideoPlayer from './component/video';
import Chapter from './components/chapter/Chapter'
import './App.css'
import MapComponent from './component/map';

export default function App() {
  const { isLoading, error, response } = useGetDatas()

  const chapters = () => {
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
        {<VideoPlayer videoUrl={response.Film.file_url} timeToJump={300} />}
        <MapComponent center={[45.1699981689, 1.5633200407]} zoom={13} />
        <FlatList
          data={chapterList}
          renderItem={({ item }) => <Chapter id={item.id} title={item.title} pos={item.pos} onClick={(id) => {console.log(id)}} />}
          keyExtractor={item => item.id}
        />
      </div>
    )
  }

  return (
    <View>
      {chapters()}
    </View>
  )
}
