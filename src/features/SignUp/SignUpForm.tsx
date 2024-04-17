import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useRegisterMutation } from '../../api/userSlice'

import Spinner from '../../components/Spinner'
import EmailIcon from '../../components/EmailIcon'
import ProfileIcon from '../../components/ProfileIcon'
import PasswordIcon from '../../components/PasswordIcon'

import type { RegisterPayload } from '../../api/userSlice'

function SignUpForm() {
	const [_errors, setErrors] = useState<null | string>(null)
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [register] = useRegisterMutation()

	const { login } = useAuth()

	const {
		register: registerField,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm()

	async function onSubmit(values: RegisterPayload) {
		try {
			setIsLoggingIn(true)
			const token = await register(values).unwrap()
			login(token)
		} catch (error: any) {
			setErrors(error?.message && typeof error?.message === 'string' ? error.message : 'error creating account')
		} finally {
			setIsLoggingIn(false)
		}
	}

	return (
		<div className="flex items-center m-auto bg-neutral w-[30rem] px-[6.5rem] py-6 rounded-xl">
			<form onSubmit={handleSubmit((values) => onSubmit(values as RegisterPayload))}>
				{/* fieldset checks if user is logging in and disables the form while loading. */}
				<fieldset disabled={isLoggingIn}>
					<h3 className="text-2xl mb-5 text-center">Sign-up</h3>
					<p className="mb-5 text-center">
						Join <i>Have You?</i> to start creating and storing your personal tasks.
					</p>

					{/* username field */}
					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<ProfileIcon />
							<input
								{...registerField('username', {
									required: 'username required*',
									minLength: {
										value: 8,
										message: 'minimum 8 characters required',
									},
									maxLength: {
										value: 25,
										message: 'maximum 25 characters',
									},
									validate: {
										noSpaces: (value) => !/\s/.test(value) || 'username cannot contain spaces',
									},
								})}
								type="text"
								className="grow bg-base-100"
								placeholder="Username"
								autoFocus
							/>
						</label>
						<p className="text-error text-sm absolute">{String(errors.username?.message)}</p>
					</div>

					{/* email field */}
					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<EmailIcon />
							<input
								{...registerField('email', {
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
						<p className="text-error text-sm absolute">{String(errors?.email?.message)}</p>
					</div>

					{/* password field */}
					<div className="mb-8">
						<label className="input input-bordered input-secondary rounded-md flex items-center gap-2">
							<PasswordIcon />
							<input
								{...registerField('password', {
									required: 'password required*',
									minLength: {
										value: 8,
										message: 'password must be minimum 8 characters',
									},
									maxLength: {
										value: 20,
										message: 'password cannot exceed 20 characters',
									},
									validate: {
										uppercase: (value) => /[A-Z]/.test(value) || 'must contain at least one uppercase letter',
										specialChar: (value) => /[@$!%*?&]/.test(value) || 'must contain at least one special character',
										noSpaces: (value) => !/\s/.test(value) || 'password must not contain spaces',
									},
								})}
								type="password"
								className="grow bg-base-100"
								placeholder="Password"
							/>
						</label>
						<p className="text-error text-sm absolute">{String(errors?.password?.message)}</p>
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
						{_errors && <div className="bg-rose-600 mb-5 px-1 py-0.5 w-[95%] m-auto text-sm text-center font-semibold">{_errors}</div>}
					</div>
				</fieldset>
			</form>
		</div>
	)
}

export default SignUpForm
