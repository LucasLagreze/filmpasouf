import React from 'react'
import { FlatList } from 'react-native'
import { ITypeMessage } from '../../types/ITypeMessage'
import Message from './message'
import Sender from './sender'

export type ChatViewProps = {
    messages: ITypeMessage[]
    onClick: (id: number) => void
    onSubmit: (msg: string, moment: boolean) => void
}

export default function ChatView({messages, onClick, onSubmit}: ChatViewProps) {
    return (
        <div className="chat">
            <Sender onClick={onSubmit} />
            <div className="message__container">
                <FlatList
                    data={messages.filter(msg => msg.when < 4543856000000 ).sort((a, b) => a.when - b.when).reverse()} // Pour supprimer les rickroll et faire apparaître les messages les plus récents en premier
                    renderItem={({ item })=> <Message message={item} onClick={onClick} />}
                    keyExtractor={msg => msg.when.toString()}
                />
                <div className="anchor"></div>
            </div>
        </div>
    )
}