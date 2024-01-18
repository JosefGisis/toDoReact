import { useForm } from 'react-hook-form'
import { useSignUp } from '../hooks/useSignUp'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'

function SignUpForm() {
	const { signUp, token, errs, isLoading } = useSignUp()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm()

	useEffect(() => {
		if (token) {
			localStorage.setItem('jwt', token)
			navigate('/')
		}
	}, [token])

	const onSubmit = (data) => {
		signUp(data)
	}

	return (
		<div className="flex items-center m-auto bg-slate-700 w-[30rem] px-[6.5rem] py-6 rounded-xl">
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset disabled={isLoading}>
					<h3 className="text-2xl mb-5 text-center">Sign-up</h3>
					<p className="mb-5 text-center">
						Join <i>Have You?</i> to start creating and storing your personal tasks.
					</p>

					<div className="mb-8">
						<input
							{...register('username', {
								required: 'username required*',
								minLength: {
									value: 5,
									message: 'minimum five characters required',
								},
								maxLength: {
									value: 25,
									message: 'maximum twenty-five characters',
								},
							})}
							className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
							type="text"
							placeholder="username"
						></input>
						{errors?.username && <p className="text-rose-500 text-sm absolute">{errors.username.message}</p>}
					</div>

					<div className="mb-8">
						<input
							{...register('email', {
								required: 'email required*',
								pattern: {
									value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
									message: 'invalid email address',
								},
							})}
							className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
							type="text"
							placeholder="email"
						></input>
						{errors.email && <p className="text-rose-500 text-sm absolute">{errors.email.message}</p>}
					</div>

					{isLoading && <Spinner />}

					<div className="mb-8">
						<input
							{...register('password', {
								required: 'password required*',
								minLength: {
									value: 8,
									message: 'minimum eight characters required',
								},
							})}
							className="text-black p-2 w-[100%] bg-slate-50 rounded-md focus:outline-sky-500"
							type="password"
							placeholder="password"
						></input>
						{errors?.password && <p className="text-rose-500 text-sm absolute">{errors.password.message}</p>}
					</div>

					<p className="text-center mb-4">
						Go back to{' '}
						<a className={'text-sky-500 ' + (!isLoading ? 'hover:underline' : '')} href="/login">
							login
						</a>
					</p>

					<div className="mb-6">
						<button
							id="new-list-submit"
							className={
								'w-[100%] py-2 mb-3 focus:outline-sky-500 transition ' +
								(isValid && !isLoading ? 'bg-sky-500 hover:bg-sky-600 hover:underline' : 'bg-sky-800')
							}
							type="submit"
						>
							create account
						</button>
						{errs && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{errs.message}</div>}
					</div>
				</fieldset>
			</form>
		</div>
	)
}

export default SignUpForm
