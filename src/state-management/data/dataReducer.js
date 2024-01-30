const dataReducer = (data, action) => {
    if (action.type === 'POPULATE') return action.payload
    return data
}

export default dataReducer