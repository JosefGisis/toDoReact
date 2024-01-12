import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/authHooks'

function LoginForm() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [login, {isLoading}] = useLogin()

	useEffect(() => {
		if (isLoggedIn) console.log('logged in')
		if (!isLoggedIn) console.log('not logged in')
	}, [isLoggedIn])

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitted },
	} = useForm()

	const onSubmit = async (data) => {
		login()
        fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
			'content-type': 'application/json'
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password
			})})
            .then((res) => res.json())
			.then((data) => {
				console.log(data)
				data?.message && setIsLoggedIn(false)
				data?.successfulLogin && setIsLoggedIn(true)
			})
			.catch((err) => console.log(err))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-[100%]"> 
			<h3 className="text-2xl mb-5 text-center">Login</h3>
			<p className="mb-5 text-center">Welcome back! Sign-in to see your tasks.</p>

			<div className="mb-8">
				<input
					{...register('username', { required: true, minLength: 5, maxLength: 25 })}
					className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
					type="text"
					placeholder="username"
				></input>
				{errors.username?.type === 'minLength' && isSubmitted && <p className="text-rose-500 text-sm absolute">minimum five characters required*</p>}
			</div>

			<div className="mb-8">
				<input
					{...register('password', { required: true, minLength: 8 })}
					className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
					type="password"
					placeholder="password"
				></input>
				{errors.password?.type === 'minLength' && isSubmitted && <p className="text-rose-500 text-sm absolute">minimum eight characters required*</p>}
				{errors.password?.type === 'required' && isSubmitted && <p className="text-rose-500 text-sm absolute">field required*</p>}
			</div>

			<button
				id="new-list-submit"
				className={
					'w-[100%] py-2 mb-6 focus:outline-sky-500 transition ' +
					(isValid ? 'bg-sky-500 hover:bg-sky-600 hover:underline' : 'bg-sky-800')
				}
				type="submit"
			>
				login
			</button>

			<hr></hr>

			<p className="mt-4 text-sm text-center">
				Do not have an account yet? <br /> Sign up for free!{' '}
			</p>

			<a href="/signup"><button
				className={'w-[100%] p-2 mt-4 bg-slate-500 focus:outline-sky-500 transition hover:bg-slate-600 hover:underline'}
				type="button"
			>
				sign up
			</button></a>
		</form>
	)
}

export default LoginForm
