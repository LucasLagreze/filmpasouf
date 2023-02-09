import React, {useState} from 'react'

export type SenderProps = {
    onClick: (msg: string) => void
}

export default function Sender({onClick}: SenderProps) {
    const [message, setMessage] = useState("")

    return (
        <div className="sender" data-testid="sender">
            <input type="text" id="sender__message"  data-testid="sender__message" value={message} onInput={(ev) => {
                const target = ev.target as HTMLInputElement;
                setMessage(target.value)
            }} />
            <button id="sender__button"  data-testid="sender__button" onClick={() => {
                onClick(message)
                setMessage("")
            }}>Envoyer</button>
        </div>
    )
}