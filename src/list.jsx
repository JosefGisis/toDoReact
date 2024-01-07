import { Fragment, useState } from 'react'

function List({listTitle, listToDos}) {
    const title = listTitle
    const toDos = listToDos
    // user immer to simplify object changes
    const [selectedIndex, setSelectedIndex] = useState(-1)
    return (
        <Fragment>
            <h1 className="text-rose-500">{ title }</h1>
            <ul className="list-group">
                {toDos.map((toDo, index) => (
                <li key={toDo} 
                    className={ selectedIndex === index ? 'bg-rose-500 text-white': ''} 
                    onClick={() => (setSelectedIndex(index))}>
                    {toDo}
                </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default List