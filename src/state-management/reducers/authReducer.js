const loginReducer = (state, action) => {
    if (action.type === 'LOGIN') return action.token
    if (action.type === 'LOGOUT') return null
    return state
}

export default loginReducer