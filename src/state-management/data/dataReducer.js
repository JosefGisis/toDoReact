const dataReducer = (data, action) => {
	if (action.type === 'ADD LISTS') {
		try {
			if (!Array.isArray(action.payload)) throw new Error('Dispatch ADD LISTS requires payload of type Array')
			return { ...data, lists: action.payload }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}
	
	if (action.type === 'ADD LIST') {
		try {
			if (typeof action.payload !== 'object' || !Object.keys(action.payload).length) throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')
			return { ...data, lists: [ ...data.lists, { ...action.payload, toDos: [] } ] }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'REMOVE LIST') {
		return { ...data, lists: data.lists.filter((list) => list.id !== action.payload) }
	}

	if (action.type === 'ADD TODOS') {
		return { ...data, toDos: action.payload }
	}

	if (action.type === 'ADD LIST TODOS') {
		if (action.payload.length) {
			const listId = action.payload[0]?.membership
			const listIndex = data.lists.findIndex((list) => list.id === listId)
			const list = { ...data.lists[listIndex], toDos: action.payload }
			const lists = data.lists
			lists[listIndex] = list
			return { ...data, lists }
		}
		return { ...data }
	}

	if (action.type === 'REMOVE TODO') {
		if (!action.payload.membership) {
			const toDos = data.toDos.filter((toDo) => toDo.id !== action.payload.id)
			return { ...data, toDos }
		} else {
			const listId = action.payload.membership
			const listIndex = data.lists.findIndex((list) => list.id === listId)
			const toDos = data.lists[listIndex].toDos.filter((toDo) => toDo.id !== action.payload.id)
			const list = { ...data.lists[listIndex], toDos }
			const lists = [ ...data.lists ]
			lists[listIndex] = list
			return { ...data, lists }
		}
	}

	if (action.type === 'TOGGLE TODO') {
		if (!action.payload.membership) {
			const toDos = data.toDos.map((toDo) => {
				if (toDo.id === action.payload.id) {
					return { ...toDo, completed: toDo.completed === 0 ? 1 : 0 }
				}
				return toDo
			})
			return { ...data, toDos }
		} else {
			const listId = action.payload.membership
			const listIndex = data.lists.findIndex((list) => list.id === listId)
			const toDos = data.lists[listIndex].toDos.map((toDo) => {
                if (toDo.id === action.payload.id) {
                    return { ...toDo, completed: toDo.completed === 0 ? 1 : 0 }
                }
				return toDo
			})
			const list = { ...data.lists[listIndex], toDos }
			const lists = [ ...data.lists ]
			lists[listIndex] = list
			return { ...data, lists }
		}
	}

	if (action.type === 'ADD TODO') {
		if (!action.payload.membership) {
			const toDos = [ ...data.toDos, action.payload ]
			return { ...data, toDos }
		} else {
			const listId = action.payload.membership
			const listIndex = data.lists.findIndex((list) => list.id === listId)
			const toDos = [ ...data.lists[listIndex].toDos, action.payload ] 
			const list = { ...data.lists[listIndex], toDos }
			const lists = [ ...data.lists ]
			lists[listIndex] = list
			return { ...data, lists }
		}
	}

	return data
}

export default dataReducer
