const listReducer = (activeList, action) => {
    if (action.type === 'ASSIGN') return action.payload
    return activeList
}

export default listReducer