// action.type constants
export const actions = {
	SET_ACTIVE_LIST: 'SET_ACTIVE_LIST',
	REMOVE_ACTIVE_LIST: 'REMOVE_ACTIVE_LIST',

	ADD_LISTS: 'ADD_LISTS',
	ADD_TODOS: 'ADD_TODOS',
	ADD_LIST_TODOS: 'ADD_LIST_TODOS',
	REMOVE_LIST_TODOS: 'REMOVE_LIST_TODOS',

	ADD_LIST: 'ADD_LIST',
	UPDATE_LIST: 'UPDATE_LIST',
	REMOVE_LIST: 'REMOVE_LIST',

	ADD_TODO: 'ADD_TODO',
	REMOVE_TODO: 'REMOVE_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	UPDATE_TODO: 'UPDATE_TODO',
}

const listReducer = (data, action) => {
	// helper functions for switch/case
	const updateList = (id, update) => (list) => list.id === id ? { ...list, ...update } : list
	const updateToDo = (id, update) => (toDo) => toDo.id === id ? { ...toDo, ...update } : toDo
	const toggleToDo = (id) => (toDo) => toDo.id === id ? { ...toDo, completed: toDo.completed ? 0 : 1 } : toDo

	const { type, payload } = action
	switch (type) {
		case actions.SET_ACTIVE_LIST: {
			if (typeof payload !== 'number') throw new Error('Dispatch SET_ACTIVE_LIST requires payload of type Number')
			return { ...data, activeListId: payload }
		}

		case actions.REMOVE_ACTIVE_LIST: {
			return { ...data, activeListId: null }
		}

		case actions.ADD_LISTS: {
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD LISTS requires payload of type Array')
			return { ...data, lists: payload.map((list) => ({ ...list, toDos: [] })) }
		}

		case actions.ADD_LIST: {
			if (typeof payload !== 'object' || !Object.keys(payload).length) {
				throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')
			}
			return { ...data, lists: [...data.lists, { ...payload, toDos: [] }] }
		}

		case actions.UPDATE_LIST: {
			if (typeof payload !== 'object' || !Object.keys(payload).length) {
				throw new Error('Dispatch ADD LIST requires payload of type Object and can not be empty')
			}
			const { id, ...update } = payload
			return { ...data, lists: data.lists.map(updateList(id, update)) }
		}

		case actions.REMOVE_LIST: {
			if (typeof payload !== 'number') throw new Error('Dispatch REMOVE LIST requires payload of type Number')
			return { ...data, lists: data.lists.filter((list) => list.id !== payload) }
		}

		case actions.ADD_TODOS: {
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD TODOS requires payload of type Array')
			return { ...data, toDos: payload }
		}

		case actions.ADD_LIST_TODOS: {
			if (!Array.isArray(payload)) throw new Error('Dispatch ADD LIST TODOS requires payload of type Array')
			if (!payload.length) return { ...data }
			const lists = data.lists.map((list) => (list.id === payload[0].membership ? { ...list, toDos: payload } : list))
			return { ...data, lists }
		}

		case actions.REMOVE_LIST_TODOS: {
			if (typeof(payload) !== 'number') throw new Error('Dispatch REMOVE LIST TODOS requires payload of type Number')
			const lists = data.lists.map((list) => (list.id === payload ? { ...list, toDos: []} : list))
			return { ...data, lists }
		}

		case actions.REMOVE_TODO: {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch REMOVE TODO requires payload of type Object and can not be empty')
			
			if (!payload.membership) return { ...data, toDos: data.toDos.filter((toDo) => toDo.id !== payload.id) }
		
			const lists = data.lists.map((list) =>
				list.id === payload.membership ? { ...list, toDos: list.toDos.filter((toDo) => toDo.id !== payload.id) } : list
			)
			return { ...data, lists }
		}

		case actions.TOGGLE_TODO: {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch TOGGLE TODO requires payload of type Object and can not be empty')

			if (!payload.membership) return { ...data, toDos: data.toDos.map(toggleToDo(payload.id)) }

			const lists = data.lists.map((list) =>
				list.id !== payload.membership ? list : { ...list, toDos: list.toDos.map(toggleToDo(payload.id)) }
			)
			return { ...data, lists }
		}

		case actions.UPDATE_TODO: {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch UPDATE TODO requires payload of type Object and can not be empty')

			const { id, ...update } = payload

			if (!payload.membership) return { ...data, toDos: data.toDos.map(updateToDo(id, update)) }

			const lists = data.lists.map((list) =>
				list.id !== payload.membership ? list : { ...list, toDos: list.toDos.map(updateToDo(id, update)) }
			)
			return { ...data, lists }
		}

		case actions.ADD_TODO: {
			if (typeof payload !== 'object' || !Object.keys(payload).length)
				throw new Error('Dispatch ADD TODO requires payload of type Object and can not be empty')
			
			if (!payload.membership) return { ...data, toDos: [...data.toDos, payload] }

			const lists = data.lists.map((list) =>
				(list.id === payload.membership) ? { ...list, toDos: [...list.toDos, payload] } : list
			)
			return { ...data, lists }
		}

		default:
			throw new Error('no action.type provided')
	}
}

export default listReducer