const listIdReducer = (state, action) => {
    if (action.type === 'ASSIGN') return action.value
    return state
}

export default listIdReducer