import React from 'react'
import { ITypeMessage } from '../../types/ITypeMessage'

export type MessageProps = {
    message: ITypeMessage
}

export default function Message({message}: MessageProps) {
    let momentNodeDisplay = (message.moment == -1) ? "message__moment hide" : "message__moment" // On cache le label de moment lorsque celui-ci n'est pas défini (= -1)
    let date = new Date(message.when).toLocaleString()

    return (
        <div className="message" data-testid="message" id={message.moment.toString()}>
            <div className="message__top">
                <p className="message__name" data-testid="message__name">{message.name}</p>
                <p className="message__when" data-testid="message__when">{date}</p>
            </div>
            <div className="message__bottom">
                <p className={momentNodeDisplay} data-testid="message__moment">{message.moment}</p>
                <p className="message__message" data-testid="message__message">{message.message}</p>
            </div>
        </div>
    )
}