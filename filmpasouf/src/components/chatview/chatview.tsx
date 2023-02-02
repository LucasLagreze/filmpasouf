import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { ITypeMessage } from '../../types/ITypeMessage'
import Message from './message'

export type ChatViewProps = {
}

const URL = "wss://imr3-react.herokuapp.com"
const socket = new WebSocket(URL)

export default function ChatView({}: ChatViewProps) {
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
    return (
        <div>
            <FlatList
              data={messages}
              renderItem={({ item })=> <Message message={item} />}
              keyExtractor={msg => msg.when.toString()}
            />
        </div>
    )
}