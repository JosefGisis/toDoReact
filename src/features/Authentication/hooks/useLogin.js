import { useCallback, useState } from 'react'

export function useLogin() {
	const [isLoading, setIsLoading] = useState(false)
	const [errs, setErrs] = useState(null)

	const login = useCallback(async (data) => {
		setIsLoading(true)
		try {
			const response = await fetch('http://localhost:3000/api/1/auth/login', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
			})

			const json = await response.json()

			if (json.status === 200) {
				setErrs(null)
				return [null, json.token]
			}

			if (json.status === 401) {
				setErrs({ message: json.message })
				return [json.message]
			}

			console.log(json.message)
			throw new Error('Error logging in. Please try again later.')
		} catch (error) {
			setErrs({ message: error.message })
			return ['Error logging in. Please try again later.']
		} finally {
			setIsLoading(false)
		}
	}, [])

	return { login, isLoading, errs }
}