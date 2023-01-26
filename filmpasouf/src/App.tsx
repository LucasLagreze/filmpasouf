import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import VideoPlayer from './component/video';

export default function App() {
  const { isLoading, error, response } = useGetDatas()

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (error) {
      return <Text>{error}</Text>
    }
    
    return (
      <div>
        <h1>Welcome to the Video Player</h1>
        {<VideoPlayer videoUrl={response.Film.file_url} timeToJump={300} />}
      </div>
    )
  }

  return (
    <View style={styles.container}>
      {getContent()}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


