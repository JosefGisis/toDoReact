import { useCallback, useContext, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import ActiveListContext from '../../../state-management/List/ListContext'

export function useAccessList() {
	const { logout, getToken } = useAuth()
	const [errs, setErrs] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { activeList, dispatch } = useContext(ActiveListContext)
	const token = getToken()

	const accessList = useCallback((list) => {
		if (list) {
			dispatch({ type: 'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })

			setIsLoading(true)
			fetch(`http://localhost:3000/api/1/lists/${list.id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: list.title,
					accessListOnly: true,
				}),
			})
				.then((res) => {
					if (res.status === 200) return res.json()
					if (res.status === 401) logout()
					throw new Error('Error retrieving your data. Please try again later.')
				})
				.then(() => {
					setErrs(null)
					setIsLoading(false)
				})
				.catch(() => {
					setErrs({ message: 'Error creating account. Please try again later' })
					setIsLoading(false)
				})
		} else {
			dispatch({ type: 'UNASSIGN' })
		}
	}, [])

	return { isLoading, errs, activeList, accessList }
}
