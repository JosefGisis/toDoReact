import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useLogin } from '../hooks/useLogin'
import { useAuth } from '../../../hooks/useAuth'

import Spinner from '../../../components/Spinner'
import ProfileIcon from '../../../components/ProfileIcon'
import PasswordIcon from '../../../components/PasswordIcon'

function LoginForm() {
	const [_errors, setErrors] = useState(null)
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	const navigate = useNavigate()
	const { setToken } = useAuth()
	const { login } = useLogin()

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
				setErrors({ message: error })
				return
			}
			setToken(token)
			navigate('/')
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<div className="flex flex-col items-center bg-neutral w-[25rem] px-[5rem] pt-6 pb-8 rounded-xl">
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset disabled={isLoggingIn}>
					<h3 className="text-2xl mb-5 text-center">Login</h3>
					<p className="mb-5 text-center">Welcome back! Sign-in to see your to-dos.</p>

					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<ProfileIcon />
							<input
								{...register('username', { required: 'username required*' })}
								type="text"
								className="grow bg-base-100"
								placeholder="username"
							/>
						</label>
						{errors?.username && <p className="text-error text-sm absolute">{errors.username.message}</p>}
					</div>

					{isLoggingIn && <Spinner />}

					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<PasswordIcon />
							<input
								{...register('password', { required: 'password required*' })}
								type="password"
								className="bg-base-100 grow"
								placeholder="password"
							/>
						</label>
						{errors?.password && <p className="text-error text-sm absolute">{errors.password.message}</p>}
					</div>

					<div className="mb-6">
						<button
							id="new-list-submit"
							className={'btn w-[100%] py-2 mb-3 rounded-none transition ' + (isValid && !isLoggingIn ? 'btn-secondary hover:underline' : '')}
							type="submit"
						>
							login
						</button>
						{_errors && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{_errors}</div>}
					</div>

					<hr className="border-secondary"></hr>

					<p className="mt-4 text-sm text-center">
						Do not have an account yet? <br /> Sign up for free!{' '}
					</p>

					<a href="/signup">
						<button
							className={
								'btn btn-neutral w-[100%] p-2 mt-4 border border-secondary rounded-none transition ' +
								(!isLoggingIn && 'hover:border hover:border-secondary hover:underline')
							}
							type="button"
						>
							sign-up
						</button>
					</a>
				</fieldset>
			</form>
		</div>
	)
}

export default LoginForm
