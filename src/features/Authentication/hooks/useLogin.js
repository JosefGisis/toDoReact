import { useCallback, useState } from 'react'

export function useLogin() {
	const [isLoading, setIsLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [token, setToken] = useState(null)

	const login = useCallback((data) => {
		const signal = new AbortController().signal

		setIsLoading(true)
		
		fetch('http://localhost:3000/api/1/auth/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					setErrs({ message: data?.message })
					setToken(null)
					setIsLoading(false)
				}
				if (data?.status === 200) {
					setToken(data?.token)
					setErrs(null)
					setIsLoading(false)
				}
			})
			.catch(() => {
				setErrs({ message: 'Error logging in. Please try again later' })
				setIsLoading(false)
			})

		return () => AbortController.abort()
	}, [])

	return { login, isLoading, errs, token }
}
