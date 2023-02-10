import { useState } from 'react'
import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import VideoPlayer from './components/video/video'
import Chapter from './components/chapter/Chapter'
import './App.css'
import MapComponent from './components/map/map'
import KeywordsComponent from './components/keywords/keywords'
import ChatView from './components/chatview/chatview'
import { ITypeMessage } from './types/ITypeMessage'

const URL = "wss://imr3-react.herokuapp.com"
const socket = new WebSocket(URL)

export default function App() {
  const { isLoading, error, response } = useGetDatas()
  const [chapterTime, setChapterTime] = useState<number>(0)
  const [messages, setMessages] = useState<ITypeMessage[]>([])

  socket.onmessage = evt => {
      const newMessages = JSON.parse(evt.data)
      setMessages(newMessages.map((msg: any) => {
          return {
              message: msg.message,
              when: msg.when,
              name: msg.name,
              moment: msg.moment ? msg.moment : -1
          }
      }).concat(messages))
  }

  const submitMessage = (msg: string, moment: boolean) => {
    let message = {}
    if(moment) message = { name: "Lucas & Yoann", message: msg, moment: Math.floor(chapterTime) }
    else message = { name: "Lucas & Yoann", message: msg }
    socket.send(JSON.stringify(message))
  }

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
          <div className="keywords__container">
            <KeywordsComponent keywords={response.Keywords}/>
          </div>
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
            <MapComponent waypoint={response.Waypoints} zoom={3}/>
          </div>
          <div className="chat__container">
            <ChatView messages={messages} onClick={(id) => setChapterTime(id)} onSubmit={submitMessage} />
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
