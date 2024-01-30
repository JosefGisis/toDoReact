const dataReducer = (data, action) => {
    if (action.type === 'ALTER DATA') return action.payload
    if (action.type === 'ADD LIST') {
        const lists = [ ...data.lists, ({...action.payload, toDos: []})]
        return { lists }
    }

    if (action.type === 'REMOVE LIST') {
        const lists = data.lists.filter(list => list.id !== action.payload)
        return { lists }
    }
    return data
}

export default dataReducer