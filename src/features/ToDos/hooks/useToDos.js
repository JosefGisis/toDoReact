import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'
import { useAuth } from '../../../hooks/useAuth'
import ActiveListContext from '../../../state-management/List/ListContext'

const useToDos = () => {
	const { logout } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [toDos, setToDos] = useState(null)
	const { token } = useContext(AuthContext)
	const { activeList } = useContext(ActiveListContext)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		setLoading(true)

		if (token) {
			fetch(`http://localhost:3000/api/1/lists/${activeList.id}/to-dos`, {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				signal: signal,
			})
				.then((res) => {
					if (res.status === 200) return res.json()
					if (res.status === 401) logout()
					throw new Error('error stuff')
				})
				.then((data) => {
					setToDos(data.data)
					setLoading(false)
				})
				.catch((err) => {
					setErrs(err)
					setLoading(false)
				})
		}
		return () => controller.abort()
	}, [activeList])

	return { toDos, loading, errs }
}

export default useToDos
