import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import useGetDatas from './services/getDatas'
import Chapter from './components/chapter/Chapter'
import './App.css'

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
      <FlatList
        data={chapterList}
        renderItem={({ item }) => <Chapter id={item.id} title={item.title} pos={item.pos} onClick={(id) => {console.log(id)}} />}
        keyExtractor={item => item.id}
      />
    )
  }

  return (
    <View>
      {chapters()}
    </View>
  )
}
