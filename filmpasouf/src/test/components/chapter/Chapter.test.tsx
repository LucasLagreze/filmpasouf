import { render, screen, fireEvent } from "@testing-library/react";
import Chapter from '../../../components/chapter/Chapter'

let clicked = 0
let onClick = function() {
    clicked++
}

test("check id implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} onClick={onClick} />)
    
    const chapter = screen.getByTestId("chapter")
    
    expect(chapter).toHaveAttribute("id", "1")
})

test("check title implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} onClick={onClick} />)
    
    const chapterTitle = screen.getByTestId("chapter__title")
    
    expect(chapterTitle).toHaveTextContent("Title.")
})

test("check pos implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} onClick={onClick} />)
    
    const chapterPos = screen.getByTestId("chapter__pos")
    
    expect(chapterPos).toHaveTextContent("01:01:01")
})

test("check click implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} onClick={onClick} />)
    
    const chapter = screen.getByTestId("chapter")

    fireEvent.click(chapter)
    
    expect(clicked).toEqual(1)
})