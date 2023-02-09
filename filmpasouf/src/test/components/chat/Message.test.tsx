import { render, screen, fireEvent } from "@testing-library/react";
import Message from '../../../components/chatview/message'

let clicked = 0
let onClick = function() {
    clicked++
}

let defaultMessage = {
    "name": "Mon nom.",
    "when": 1675416004054,
    "moment": 600,
    "message": "Hello world."
}

test("check id implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const message = screen.getByTestId("message")
    
    expect(message).toHaveAttribute("id", defaultMessage.when.toString())
})

test("check name implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const messageName = screen.getByTestId("message__name")
    
    expect(messageName).toHaveTextContent(defaultMessage.name)
})

test("check when implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const messageWhen = screen.getByTestId("message__when")
    
    expect(messageWhen).toHaveTextContent(new Date(defaultMessage.when).toLocaleString())
})

test("check moment implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const messageMoment = screen.getByTestId("message__moment")
    
    expect(messageMoment).toHaveTextContent(defaultMessage.moment.toString())
})

test("check message implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const messageMessage = screen.getByTestId("message__message")
    
    expect(messageMessage).toHaveTextContent(defaultMessage.message)
})

test("check click implementation", () => {
    render(<Message message={defaultMessage} onClick={onClick} />)
    
    const messageMoment = screen.getByTestId("message__moment")

    fireEvent.click(messageMoment)
    
    expect(clicked).toEqual(1)
})