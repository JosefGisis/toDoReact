import { useCallback, useState } from 'react'

export function useSignUp() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const signUp = useCallback(async (data) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch('http://localhost:3000/api/1/auth/register', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password,
				}),
			})

			const json = await response.json()

			if (response.status === 200) {
				setMeta({ ...meta, errors: null })
				return [null, json.data]
			}
			if (response.status === 401) {
				setMeta({ ...meta, errors: json.message })
				return [json.message]
			}
			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, error: error.message })
			return [error]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	})

	return { meta, signUp }
}
