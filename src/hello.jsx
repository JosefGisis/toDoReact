import { Fragment } from 'react'

const messages = ['this is a test', 'this is another test', 'this is yet another test']

function Message() {
    return (
        <Fragment>
            <h1 className="text-rose-500">Here are some messages</h1>
            <ul className="list-group">
                {messages.map((message, index) => (
                <li key={message} className="cursor-pointer hover:bg-rose-500 hover:text-white" onClick={() => (console.log(`${message} at ${index}`))}>
                    {message}
                </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default Message