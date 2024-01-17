import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
	const { login, token, errs } = useLogin()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors, isValid },
	} = useForm()

	useEffect(() => {
		if (token) {
			localStorage.setItem('jwt', token)
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		if (errs) resetField('password')
	}, [errs])
	
	const onSubmit = (data) => {
		login(data)
	}

	return (
		<div className="flex flex-col items-center bg-slate-700 w-[25rem] px-[5rem] py-6 rounded-xl">
			<form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
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
							(isValid ? 'bg-sky-500 hover:bg-sky-600 hover:underline' : 'bg-sky-800')
						}
						type="submit"
					>
						login
					</button>
					{errs && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{ errs.message }</div>}
				</div>

				<hr></hr>

				<p className="mt-4 text-sm text-center">
					Do not have an account yet? <br /> Sign up for free!{' '}
				</p>

				<a href="/signup">
					<button
						className={'w-[100%] p-2 mt-4 bg-slate-500 focus:outline-sky-500 transition hover:bg-slate-600 hover:underline'}
						type="button"
					>
						sign up
					</button>
				</a>
			</form>
		</div>
	)
}

export default LoginForm
