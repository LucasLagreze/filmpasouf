import React from 'react'
import Chapter from './Chapter'
import {ChapterProps} from './Chapter'

interface ChapterListProps {
    chapters: Array<ChapterProps>
}

export default function ChapterList({chapters}: ChapterListProps) {

    let list = chapters.map((chapter) => {
        return <li key={chapter.id}> {
            Chapter({
            id: chapter.id,
            title: chapter.title,
            pos: chapter.pos
        }) } </li> 
    })

    return (
        <div className="chapters" data-testid="chapters">
            <ul>{list}</ul>
        </div>
    )
}