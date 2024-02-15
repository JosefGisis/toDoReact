import { useCallback, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function useAccessList() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const accessList = useCallback(async (list) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${list.id}`, {
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

					if (response.status === 200) {
						return [null]
					} else if (response.status === 401) {
						logout()
						setMeta({ ...meta, errors: { message: 'unauthorized user' }})
						return ['unauthorized user']
					} else {
						const json = await response.json()	
						console.log(json.message)
						setMeta({ ...meta, errors: { message: json.message }})
						return ['error editing list']
					}
		} catch (error) {
			setMeta({ ...meta, errors: {message: error.message} })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, accessList }
}
