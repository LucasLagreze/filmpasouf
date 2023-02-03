import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { ITypeMessage } from '../../types/ITypeMessage'
import Message from './message'

export type ChatViewProps = {
    onClick: (id: number) => void
}

const URL = "wss://imr3-react.herokuapp.com"
const socket = new WebSocket(URL)

export default function ChatView({onClick}: ChatViewProps) {
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
        <div className="chat">
            <div className="message__container">
                <FlatList
                data={messages.filter(msg => msg.when < 4543856000000 ).reverse()} // Pour supprimer les rickroll et faire apparaître les messages les plus récents en premier
                renderItem={({ item })=> <Message message={item} onClick={onClick} />}
                keyExtractor={msg => msg.when.toString()}
                />
            </div>
        </div>
    )
}