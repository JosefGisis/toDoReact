const loginReducer = (token, action) => {
    if (action.type === 'LOGIN') return action.payload
    if (action.type === 'LOGOUT') return null
    return token
}

export default loginReducer