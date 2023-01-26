import React from 'react'

export type ChapterProps = {
    id: number
    title: string
    pos: number
    onClick: (id: number) => void
}

export default function Chapter({id, title, pos, onClick}: ChapterProps) {
    let hours = ('0' + Math.floor(pos / 3600)).slice(-2)
    let minutes = ('0' + Math.floor((pos / 60) % 60)).slice(-2)
    let seconds = ('0' + Math.floor(pos % 60)).slice(-2)

    return (
        <div className="chapter" data-testid="chapter" id={id.toString()} onClick={() => onClick(id)}>
            <p className="chapter__title" data-testid="chapter__title">{title}</p>
            <p className="chapter__pos" data-testid="chapter__pos">{hours}:{minutes}:{seconds}</p>
        </div>
    )
}