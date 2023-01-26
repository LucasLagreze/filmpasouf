import { render, screen } from "@testing-library/react";
import ChapterList from '../../../components/chapter/ChapterList'
import {ChapterProps} from '../../../components/chapter/Chapter'

let chapters: Array<ChapterProps> = [
    {
        id: 1,
        title: "Title 1.",
        pos: 3661
    },
    {
        id: 2,
        title: "Title 2.",
        pos: 3662
    }
]

test("check chapter 1 implementation", () => {
    render(<ChapterList chapters={chapters} />)
    
    const chapter = screen.getAllByTestId("chapter")[0]
    
    expect(chapter.children[0]).toHaveTextContent(chapters[0].title)
    expect(chapter.children[1]).toHaveTextContent("01:01:01")
})