const dataReducer = (data, action) => {
	if (action.type === 'ADD LISTS') {
		try {
			if (!Array.isArray(action.payload)) throw new Error('Dispatch ADD LISTS requires payload of type Array')
			return { ...data, lists: action.payload.map(list => ({ ...list, toDos: [] }))}
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'ADD LIST') {
		try {
			if (typeof action.payload !== 'object' || !Object.keys(action.payload).length)
				throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')
			return { ...data, lists: [...data.lists, { ...action.payload, toDos: [] }] }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'REMOVE LIST') {
		try {
			if (typeof action.payload !== 'number') throw new Error('Dispatch REMOVE LIST requires payload of type Number')
			return { ...data, lists: data.lists.filter((list) => list.id !== action.payload) }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'ADD TODOS') {
		try {
			if (!Array.isArray(action.payload)) throw new Error('Dispatch ADD TODOS requires payload of type Array')
			return { ...data, toDos: action.payload }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'ADD LIST TODOS') {
		try {
			if (!Array.isArray(action.payload)) throw new Error('Dispatch ADD LIST TODOS requires payload of type Array')
			const lists = data.lists.map(list => {
				if (list.id === action.payload[0].membership) {
					return { ...list, toDos: action.payload }
				}
				return list
			})
			return { ...data, lists }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'REMOVE TODO') {
		try {
			if (typeof action.payload !== 'object' || !Object.keys(action.payload).length)
				throw new Error('Dispatch REMOVE TODO requires payload of type Object and can not be empty')
			if (!action.payload.membership) return { ...data, toDos: data.toDos.filter((toDo) => toDo.id !== action.payload.id) }
			const lists = data.lists.map(list => {
				if (list.id === action.payload.membership) {
					return { ...list, toDos: list.toDos.filter((toDo) => toDo.id !== action.payload.id)}
				}
				return list
			})
			return { ...data, lists }
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'TOGGLE TODO') {
		try {
			if (typeof action.payload !== 'object' || !Object.keys(action.payload).length)
				throw new Error('Dispatch TOGGLE TODO requires payload of type Object and can not be empty')
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
				const lists = [...data.lists]
				lists[listIndex] = list
				return { ...data, lists }
			}
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	if (action.type === 'ADD TODO') {
		try {
			if (typeof action.payload !== 'object' || !Object.keys(action.payload).length)
				throw new Error('Dispatch ADD TODO requires payload of type Object and can not be empty')
			if (!action.payload.membership) return { ...data, toDos: [...data.toDos, action.payload] }
			else {
				const listId = action.payload.membership
				const listIndex = data.lists.findIndex((list) => list.id === listId)
				const toDos = [...data.lists[listIndex].toDos, action.payload]
				const list = { ...data.lists[listIndex], toDos }
				const lists = [...data.lists]
				lists[listIndex] = list
				return { ...data, lists }
			}
		} catch (error) {
			return { ...data, errors: { message: error.message } }
		}
	}

	return data
}

export default dataReducer
