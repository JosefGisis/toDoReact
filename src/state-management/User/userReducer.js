export const actions = {
	ADD_USER: 'ADD_USER',
	REMOVE_USER: 'REMOVE_USER',
}

const userReducer = (user, action) => {
	const { type, payload } = action
	switch (type) {
		case actions.ADD_USER: {
			return payload
		}

		case actions.REMOVE_USER: {
			return null
		}

		default: {
			throw new Error('no action.type provided')
		}
	}
}

export default userReducer
