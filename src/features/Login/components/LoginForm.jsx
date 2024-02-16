import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Spinner from '../../../components/Spinner'
import { useLogin } from '../hooks/useLogin'
import { useAuth } from '../../../hooks/useAuth'

function LoginForm() {
	const { setToken } = useAuth()
	const { login } = useLogin()
	const navigate = useNavigate()
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [_errors, setErrors] = useState(null)

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors, isValid },
	} = useForm()

	async function onSubmit(data) {
		try {
			setIsLoggingIn(true)
			const [error, token] = await login(data)
			if (error) {
				resetField('password')
				setErrors({message: error})
				return
			}
			setToken(token)
			navigate('/')
		} catch (error) {
			setErrors(error.message)
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<div className="flex flex-col items-center bg-slate-700 w-[25rem] px-[5rem] py-6 rounded-xl">
			<form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
				<fieldset disabled={isLoggingIn}>
					<h3 className="text-2xl mb-5 text-center">Login</h3>
					<p className="mb-5 text-center">Welcome back! Sign-in to see your tasks.</p>

					<div className="mb-8">
						<input
							{...register('username', { required: 'username required*' })}
							className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
							type="text"
							placeholder="username"
						></input>
						{errors?.username && <p className="text-rose-500 text-sm absolute">{errors.username.message}</p>}
					</div>

					{isLoggingIn && <Spinner />}

					<div className="mb-8">
						<input
							{...register('password', { required: 'password required*' })}
							className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
							type="password"
							placeholder="password"
						></input>
						{errors?.password && <p className="text-rose-500 text-sm absolute">{errors.password.message}</p>}
					</div>

					<div className="mb-6">
						<button
							id="new-list-submit"
							className={
								'w-[100%] py-2 mb-3 focus:outline-sky-500 transition ' +
								(isValid && !isLoggingIn ? 'bg-sky-500 hover:bg-sky-600 hover:underline' : 'bg-sky-800')
							}
							type="submit"
						>
							login
						</button>
						{_errors && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{_errors}</div>}
					</div>

					<hr></hr>

					<p className="mt-4 text-sm text-center">
						Do not have an account yet? <br /> Sign up for free!{' '}
					</p>

					<a href="/signup">
						<button
							className={
								'w-[100%] p-2 mt-4 bg-slate-500 focus:outline-sky-500 transition' +
								(!isLoggingIn ? 'hover:bg-slate-600 hover:underline' : '')
							}
							type="button"
						>
							sign up
						</button>
					</a>
				</fieldset>
			</form>
		</div>
	)
}

export default LoginForm
