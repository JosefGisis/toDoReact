import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useSignUp } from '../hooks/useSignUp'
import { useAuth } from '../../../hooks/useAuth'

import Spinner from '../../../components/Spinner'
import EmailIcon from '../../../components/EmailIcon'
import ProfileIcon from '../../../components/ProfileIcon'
import PasswordIcon from '../../../components/PasswordIcon'

function SignUpForm() {
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [_errors, setErrors] = useState(null)

	const { signUp } = useSignUp()
	const { setToken } = useAuth()

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm()

	async function onSubmit(values) {
		try {
			const [error, token] = await signUp(values)
			if (error) {
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
		<div className="flex items-center m-auto bg-neutral w-[30rem] px-[6.5rem] py-6 rounded-xl">
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset disabled={isLoggingIn}>
					<h3 className="text-2xl mb-5 text-center">Sign-up</h3>
					<p className="mb-5 text-center">
						Join <i>Have You?</i> to start creating and storing your personal tasks.
					</p>

					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<ProfileIcon />
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
								type="text"
								className="grow bg-base-100"
								placeholder="Username"
							/>
						</label>
						{errors?.username && <p className="text-error text-sm absolute">{errors.username?.message}</p>}
					</div>

					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<EmailIcon />
							<input
								{...register('email', {
									required: 'email required*',
									pattern: {
										value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
										message: 'invalid email address',
									},
								})}
								type="text"
								className="grow bg-base-100"
								placeholder="Email"
							/>
						</label>
						{errors?.email && <p className="text-error text-sm absolute">{errors.email.message}</p>}
					</div>

					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<PasswordIcon />
							<input
								{...register('password', {
									required: 'password required*',
									minLength: {
										value: 8,
										message: 'minimum eight characters required',
									},
								})}
								type="password"
								className="grow bg-base-100"
								placeholder="Password"
							/>
						</label>
						{errors?.password && <p className="text-error text-sm absolute">{errors.password.message}</p>}
					</div>

					{isLoggingIn && <Spinner />}

					<p className="text-center mb-4">
						Go back to{' '}
						<a className={'text-info ' + (!isLoggingIn ? 'hover:underline' : '')} href="/login">
							login
						</a>
					</p>

					<div className="mb-6">
						<button
							id="new-list-submit"
							className={'btn w-[100%] py-2 mb-3 transition ' + (isValid && !isLoggingIn && 'btn-secondary hover:underline')}
							type="submit"
						>
							create account
						</button>
						{_errors?.message && (
							<div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{_errors.message}</div>
						)}
					</div>
				</fieldset>
			</form>
		</div>
	)
}

export default SignUpForm
