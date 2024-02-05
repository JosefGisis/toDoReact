import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useListContext } from '../../../hooks/useListContext'

const useNewList = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { dispatch } = useListContext()
	
	const { logout, getToken } = useAuth()
	const token = getToken()

	const createList = useCallback(async (newListData) => {
		setMeta({ ...meta, loading: true })

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
			
			const json = await response.json()

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			if (response.status !== 200) {
				console.log(json.message)
				throw new Error('error creating new list')
			}

			dispatch({ type: 'ADD LIST', payload: json.data })
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])
	return { meta, createList }
}

export default useNewList
