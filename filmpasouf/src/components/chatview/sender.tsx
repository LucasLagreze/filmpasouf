import React, {useState} from 'react'

export type SenderProps = {
    onClick: (msg: string, moment: boolean) => void
}

export default function Sender({onClick}: SenderProps) {
    const [message, setMessage] = useState("")

    return (
        <div className="sender" data-testid="sender">
            <input type="text" id="sender__message"  data-testid="sender__message" value={message} onInput={(ev) => {
                const target = ev.target as HTMLInputElement;
                setMessage(target.value)
            }} />
            <button id="sender__moment"  data-testid="sender__moment" onClick={() => {
                onClick(message, true)
                setMessage("")
            }}>Envoyer ce moment</button>
            <button id="sender__button"  data-testid="sender__button" onClick={() => {
                onClick(message, false)
                setMessage("")
            }}>Envoyer</button>
        </div>
    )
}