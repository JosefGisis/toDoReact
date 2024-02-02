// const listReducer = (activeList, action) => {
//     case 'ASSIGN') return action.payl:ad
//     case 'UNASSIGN') return n:ll
//     return activeList
// }

const listReducer = (data, action) => {
	const { type, payload } = action
	const updateList = (id, update) => (list) => list.id === id ? { ...list, ...update } : list
	const toggleToDo = (id) => (toDo) => toDo.id === id ? { ...toDo, completed: toDo.completed ? 0 : 1 } : toDo
	switch (type) {
		case 'ADD LISTS':
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD LISTS requires payload of type Array')
			return { ...data, lists: payload.map((list) => ({ ...list, toDos: [] })) }
		case 'ADD LIST':
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')
			return { ...data, lists: [...data.lists, { ...payload, toDos: [] }] }
		case 'EDIT LIST': {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')

			const { id, ...update } = payload
			return { ...data, lists: data.lists.map(updateList(id, update)) }
		}
		case 'SET_ACTIVE_LIST': {
			return { ...data, activeListId: payload.id }
		}
		case 'REMOVE LIST': {
			if (typeof payload !== 'number') throw new Error('Dispatch REMOVE LIST requires payload of type Number')
			return { ...data, lists: data.lists.filter((list) => list.id !== payload) }
		}
		case 'ADD TODOS': {
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD TODOS requires payload of type Array')
			return { ...data, toDos: payload }
		}

		case 'ADD LIST TODOS': {
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD LIST TODOS requires payload of type Array')
			const lists = data.lists.map((list) => {
				if (list.id === payload[0].membership) {
					return { ...list, toDos: payload }
				}
				return list
			})
			return { ...data, lists }
		}

		case 'REMOVE TODO': {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch REMOVE TODO requires payload of type Object and can not be empty')
			if (!payload.membership) return { ...data, toDos: data.toDos.filter((toDo) => toDo.id !== payload.id) }
			const lists = data.lists.map((list) => {
				if (list.id === payload.membership) {
					return { ...list, toDos: list.toDos.filter((toDo) => toDo.id !== payload.id) }
				}
				return list
			})
			return { ...data, lists }
		}

		case 'TOGGLE TODO': {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch TOGGLE TODO requires payload of type Object and can not be empty')

			if (!payload.membership) return { ...data, toDos: data.toDos.map(toggleToDo(payload.id)) }

			const lists = data.lists.map((list) =>
				list.id !== payload.membership ? list : { ...list, toDos: list.toDos.map(toggleToDo(payload.id)) }
			)

			return { ...data, lists }
		}

		case 'ADD TODO': {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch ADD TODO requires payload of type Object and can not be empty')
			if (!payload.membership) return { ...data, toDos: [...data.toDos, payload] }

			const lists = data.lists.map((list) => {
				if (list.id === payload.membership) {
					return { ...list, toDos: [...list.toDos, payload] }
				}
				return list
			})
			return { ...data, lists }
		}
		default:
			break
	}

	return data
}

export default listReducer
