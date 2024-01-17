import { useCallback, useState } from 'react'

export function useSignUp() {
	const [isLoading, setIsLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [errs, setErrs] = useState(null)
	const [token, setToken] = useState(null)

	const signUp = useCallback((data) => {
        setIsLoading(true)
		fetch('http://localhost:3000/api/1/auth/register', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data?.status === 401 || data?.status === 400) {
					setErrs({message: data?.message})
                    setLoggedIn(false)
                    setIsLoading(false)
                }
                if (data?.status === 200) {
                    setLoggedIn(true)
					setToken(data?.token)
                    setIsLoading(false)
                    setErrs(null)
                }
			})
			.catch((err) => console.error(err))
	}, [])

	return {signUp, isLoading, loggedIn, errs, token}
}