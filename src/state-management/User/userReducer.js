const loginReducer = (user, action) => {
    if (action.type === 'ADD_USER') return action.payload
    if (action.type === 'REMOVE_USER') return null
    return user
}

export default loginReducer