import { render, screen } from "@testing-library/react";
import Chapter from '../../../components/chapter/Chapter'

test("check id implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} />)
    
    const chapter = screen.getByTestId("chapter")
    
    expect(chapter).toHaveAttribute("id", "1")
})

test("check title implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} />)
    
    const chapterTitle = screen.getByTestId("chapter__title")
    
    expect(chapterTitle).toHaveTextContent("Title.")
})

test("check pos implementation", () => {
    render(<Chapter id={1} title={"Title."} pos={3661} />)
    
    const chapterPos = screen.getByTestId("chapter__pos")
    
    expect(chapterPos).toHaveTextContent("01:01:01")
})