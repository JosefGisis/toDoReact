import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useLoginMutation } from '../../api/userSlice.js'
import type { LoginPayload } from '../../api/userSlice.js'

import Spinner from '../../components/Spinner'
import ProfileIcon from '../../components/ProfileIcon'
import PasswordIcon from '../../components/PasswordIcon'

function LoginForm() {
	const [_errors, setErrors] = useState<null | string>(null)
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	const { login: authLogin } = useAuth()
	const [login] = useLoginMutation()

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors, isValid },
	} = useForm()

	async function onSubmit(data: LoginPayload) {
		try {
			setIsLoggingIn(true)
			const token = await login(data).unwrap()
			authLogin(token)
		} catch (error: any) {
			console.log(error)
			resetField('password')
			setErrors(error?.message && typeof error?.message === 'string' ? error.message : 'error logging in')
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<div className="flex flex-col items-center bg-neutral w-[25rem] px-[5rem] pt-6 pb-8 rounded-xl">
			<form onSubmit={handleSubmit((values) => onSubmit(values as LoginPayload))}>
				{/* fieldset checks if user is logging in and disables the form while loading */}
				<fieldset disabled={isLoggingIn}>
					<h3 className="text-2xl mb-5 text-center">Login</h3>
					<p className="mb-5 text-center">Welcome back! Sign-in to see your to-dos.</p>

					{/* username field */}
					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<ProfileIcon />
							<input
								{...register('username', { required: 'username required*' })}
								type="text"
								className="grow bg-base-100"
								placeholder="username"
								autoFocus
							/>
						</label>
						<p className="text-error text-sm absolute">{String(errors?.username?.message || '')}</p>
					</div>

					{/* logging in spinner component */}
					{isLoggingIn && <Spinner />}

					{/* password field */}
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
						<p className="text-error text-sm absolute">{String(errors?.password?.message || '')}</p>
					</div>

					{/* submit button */}
					<div className="mb-6">
						<button
							id="new-list-submit"
							className={
								'btn w-[100%] py-2 mb-3 rounded-none transition ' + (isValid && !isLoggingIn ? 'btn-secondary hover:underline' : '')
							}
							type="submit"
						>
							login
						</button>
						{_errors && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{_errors}</div>}
					</div>

					{/* section to go to create account page */}
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
