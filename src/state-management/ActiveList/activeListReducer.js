const activeListReducer = (activeList, action) => {
    if (action.type === 'ASSIGN') return action.value
    return activeList
}

export default activeListReducer