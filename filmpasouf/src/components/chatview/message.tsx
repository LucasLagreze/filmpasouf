import React from 'react'
import { ITypeMessage } from '../../types/ITypeMessage'

export type MessageProps = {
    message: ITypeMessage
}

export default function Message({message}: MessageProps) {
    return (
        <div className="message" data-testid="message" id={message.moment.toString()}>
            <div className="message__top">
                <p className="message__name" data-testid="message__name">{message.name}</p>
                <p className="message__when" data-testid="message__when">{message.when}</p>
            </div>
            <div className="message__bottom">
                <p className="message__moment" data-testid="message__moment">{message.moment}</p>
                <p className="message__message" data-testid="message__message">{message.message}</p>
            </div>
        </div>
    )
}