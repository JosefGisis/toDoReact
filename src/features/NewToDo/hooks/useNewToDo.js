import { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'
import { useAuth } from '../../../hooks/useAuth'
import ActiveListContext from '../../../state-management/ActiveList/ActiveListContext'

const useNewToDo = () => {
	const { logout } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [newToDo, setNewToDo] = useState({})
	const { token } = useContext(AuthContext)
    const { activeList } = useContext(ActiveListContext)

	const createNewToDo = useCallback((data) => {
		const controller = new AbortController()
		const signal = controller.signal
		setLoading(true)

		fetch(`http://localhost:3000/api/1/lists/${activeList.id}/to-dos`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: data.toDoTitle,
			}),
			signal: signal,
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('error stuff')
			})
			.then((data) => {
				setNewToDo(data.data)
				setLoading(false)
			})
			.catch((err) => {
				setErrs(err)
				setLoading(false)
			})
		return () => controller.abort()
	}, [])
	return { newToDo, loading, errs, createNewToDo }
}

export default useNewToDo
