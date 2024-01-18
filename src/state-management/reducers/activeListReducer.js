const activeListReducer = (activeList, activeListAction) => {
    if (activeListAction.type === 'ASSIGN') return activeListAction.value
    return activeList
}

export default activeListReducer