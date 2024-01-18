const loginReducer = (state, action) => {
    if (action.type === 'LOGIN') return true
    if (action.type === 'LOGOUT') return false
    return false
}

export default loginReducer