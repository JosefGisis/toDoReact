const listReducer = (activeList, action) => {
    if (action.type === 'ASSIGN') return action.payload
    if (action.type === 'UNASSIGN') return null
    return activeList
}

export default listReducer