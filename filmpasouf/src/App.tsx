import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'

export default function App() {
  const { isLoading, error, response } = useGetDatas()

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (error) {
      return <Text>{error}</Text>
    }
    
    console.log(response)
    return (
      <FlatList
        data={response.Chapters}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item.pos}
      />
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


