const dataReducer = (data, action) => {
    if (action.type === 'ALTER DATA') return action.payload
    return data
}

export default dataReducer