import { useCallback, useContext, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import DataContext from '../../../state-management/data/DataContext'

export function useDeleteList() {
	const [listDeleted, setListDeleted] = useState(false)
	const [errs, setErrs] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { logout, getToken } = useAuth()
	const token = getToken()
	const { data, dispatch } = useContext(DataContext)

	const deleteList = useCallback((listId) => {
		const controller = new AbortController()
		const signal = controller.signal
		console.log(listId)

		setIsLoading(true)
		fetch(`http://localhost:3000/api/1/lists/${listId}`, {
            method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			signal: signal,
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('Error retrieving your data. Please try again later.')
			})
			.then(() => {
				dispatch(data.lists.filter(list => list.id !== listId))
				setListDeleted(true)
				setErrs(null)
				setIsLoading(false)
			})
			.catch(() => {
				setListDeleted(false)
				setErrs({ message: 'Error creating account. Please try again later' })
				setIsLoading(false)
			})

		return () => controller.abort()
	}, [])

	return { isLoading, errs, listDeleted, deleteList }
}