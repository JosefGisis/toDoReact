import { useCallback, useState } from 'react'

export function useSignUp() {
	const [isLoading, setIsLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [token, setToken] = useState(null)

	const signUp = useCallback((data) => {
		const signal = new AbortController().signal

		setIsLoading(true)
		
		fetch('http://localhost:3000/api/1/auth/register', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					setToken(null)
					setErrs({ message: data?.message })
					setIsLoading(false)
				}
				if (data?.status === 200) {
					setToken(data?.token)
					setErrs(null)
					setIsLoading(false)
				}
			})
			.catch(() => {
				setErrs({ message: 'Error creating account. Please try again later' })
				setIsLoading(false)
			})

		return () => AbortController.abort()
	})

	return { signUp, isLoading, errs, token }
}
