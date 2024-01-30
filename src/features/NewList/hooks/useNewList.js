import { useCallback, useState, useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import DataContext from '../../../state-management/data/DataContext'

const useNewList = () => {
	const { logout, getToken } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [newList, setNewList] = useState({})
	const token = getToken()
	const { dispatch: dispatchData } = useContext(DataContext)

	const createList = useCallback(async (newListData) => {
		setLoading(true)

		try {
			const response = await fetch('http://localhost:3000/api/1/lists', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: newListData.listTitle,
				}),
			})

			if (response.status === 401) {
				logout()
				return
			}

			if (response.status !== 200) throw new Error('error stuff')

			const json = await response.json()
			setNewList(json.data)
			dispatchData({ type: 'ADD LIST', payload: json.data })
		} catch (error) {
			setErrs(error.message)
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}, [])
	return { newList, loading, errs, createList }
}

export default useNewList
