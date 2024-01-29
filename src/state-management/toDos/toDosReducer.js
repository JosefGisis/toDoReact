const toDosReducer = (activeList, action) => {
    if (action.type === 'ASSIGN') return action.payload
    return activeList
}

export default toDosReducer