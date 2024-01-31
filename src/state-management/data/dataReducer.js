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
        const listId = action.payload[0]?.membership
        const listIndex = data.lists.findIndex((list) => list.id === listId)
        const lists = data.lists
        console.log(lists[listIndex]?.title)
        lists[listIndex].toDos = action.payload
        return { ...data, lists }
    }
    return data
}

export default dataReducer