const loginReducer = (token, action) => {
    if (action.type === 'LOGIN') return action.value
    if (action.type === 'LOGOUT') return {}
    return token
}

export default loginReducer