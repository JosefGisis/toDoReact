const dataReducer = (data, action) => {
    if (action.type === 'ALTER DATA') return action.payload
    if (action.type === 'ADD LIST') {
        const lists = [ ...data.lists, ({...action.payload, toDos: []})]
        return { ...data, lists }
    }

    if (action.type === 'REMOVE LIST') {
        const lists = data.lists.filter(list => list.id !== action.payload)
        return { ...data, lists }
    }

    if (action.type === 'ADD TODOS') {
        return { ...data, toDos: action.payload }
    }

    if (action.type === 'ADD LIST TODOS') {
        if (action.payload.length) {
            const listId = action.payload[0]?.membership
            const listIndex = data.lists.findIndex((list) => list.id === listId)
            const list = { ...data.lists[listIndex], toDos: action.payload }
            const lists = data.lists
            lists[listIndex] = list
            return { ...data, lists }
        }
        return { ...data }
    }

    if (action.type === 'REMOVE TODO') {
        if (!action.payload.membership) {
            const toDos = data.toDos.filter(toDo => toDo.id !== action.payload.id)
            return { ...data, toDos }
        } else {
            const listId = action.payload.membership
            const listIndex = data.lists.findIndex((list) => list.id === listId)
            const toDos = data.lists[listIndex].toDos.filter(toDo => toDo.id !== action.payload.id )
            const list = { ...data.lists[listIndex], toDos }
            const lists = data.lists
            lists[listIndex] = list
            return { ...data, lists }
        }
    }

    if (action.type === 'TOGGLE TODO') {
        if (!action.payload.membership) {
            const toDos = data.toDos.map(toDo => {
                if (toDo.id === action.payload.id) {
                    toDo.completed = toDo.completed === 0 ? 1 : 0
                }
            })
            return { ...data, toDos }
        } else {
            const listId = action.payload.membership
            const listIndex = data.lists.findIndex((list) => list.id === listId)
            const toDos = data.lists[listIndex].toDos.map(toDo => toDo.id !== action.payload.id )
            const list = { ...data.lists[listIndex], toDos }
            const lists = data.lists
            lists[listIndex] = list
            return { ...data, lists }
        }
    }

    return data
}

export default dataReducer