const loginReducer = (token, action) => {
    if (action.type === 'LOGIN') return action.token
    if (action.type === 'LOGOUT') return {}
    return token
}

export default loginReducer