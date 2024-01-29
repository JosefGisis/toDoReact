import { useCallback, useState } from 'react'

export function useLogin() {
	const [isLoading, setIsLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [token, setToken] = useState(null)

	const login = useCallback(async (data) => {
		// const signal = new AbortController().signal

		setIsLoading(true)
		let result
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

			if (json?.status === 401 || json?.status === 400) {
				setErrs({ message: json?.message })
				setToken(null)
				result = [json.message]
			} else if (json?.status === 200) {
				setToken(json?.token)
				setErrs(null)
				result = [null, json.token]
			}
		} catch (error) {
			setErrs({ message: 'Error logging in. Please try again later' })
			return [errs]
		} finally {
			setIsLoading(false)
		}

		return result
	}, [])

	return { login, isLoading, errs, token }
}
