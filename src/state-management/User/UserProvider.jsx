import { useCallback, useEffect, useReducer, useState } from "react"

import UserContext from "./UserContext.js"
import useUser from "../../hooks/useUser.js"

import userReducer, { actions } from "./userReducer.js"

function UserProvider({ children }) {
	const [errors, setErrors] = useState(null)
	if (errors) console.log(' ')
	const [user, dispatch] = useReducer(userReducer, null)

	const { getUser } = useUser()

	const retrieveUser = useCallback(async () => {
		try {
			const [error, user] = await getUser()
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.ADD_USER, payload: user })
		} catch (error) {
			setErrors({ message: error.message })
		}
	}, []) 
	useEffect(() => {
		retrieveUser()
	}, [])

	return <UserContext.Provider value={{ user, dispatch }}>{children}</UserContext.Provider>
}

export default UserProvider