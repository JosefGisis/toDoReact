import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitted },
	} = useForm()

	const [err,setErr] = useState(null)

	const onSubmit = async (data) => {
        fetch('http://localhost:3000/api/register', {
			method: 'POST',
			headers: {
			'content-type': 'application/json'
			},
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password
			})})
            .then(async (res) => {
				const data = await res.json()
				if(res.status === 200) return data 
				setErr(data)
			})
			.then((data) => console.log(data))
			.catch((err) => err.json().then(error=>console.log('Error',error)))
	}
    
	return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[80%]">
			<h3 className="text-2xl mb-5 text-center">Sign-up</h3>
            <p className="mb-5 text-center">Join <i>Have You?</i> to start creating and storing your personal tasks.</p>
			{err && <div className="border rounded bg-rose-300">{err.message}</div>}
			<div className="mb-8">
				<input
					{...register('username', { 
                        required: "field required*",
                        minLength: {
                            value: 5, 
                            message: "minimum five characters required" 
                        },
                        maxLength: {
                            value: 25,
                            message: "maximum twenty-five characters"
                        }})
                    }
					className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
					type="text"
					placeholder="username"
				></input>
				{errors.username?.type === 'minLength' && isSubmitted && (
                    <p className="text-rose-500 text-sm absolute">minimum five characters required*</p>
				)}
			</div>

			<div className="mb-8">
				<input
					{...register('email', {
                        required: "field required*",
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "invalid email address"
                        }})
                    }
					className="text-black p-2 w-[100%] rounded-md focus:outline-sky-500"
					type="text"
					placeholder="email"
				></input>
				{errors.email && <p className="text-rose-500 text-sm absolute">{errors.email.message}</p>}
			</div>

            <div className="mb-8">
                <input
                    {...register('password', { 
                        required: "field required*",
                        minLength: {
                            value: 8, 
                            message: "minimum five characters required" 
                        }})
                    }
                    className="text-black p-2 w-[100%] bg-slate-50 rounded-md focus:outline-sky-500"
                    type="password"
                    placeholder="password"
                ></input>
                {errors.password?.type === 'minLength' && isSubmitted && (
                    <p className="text-rose-500 text-sm absolute">minimum eight characters required*</p>
                    )}
                {errors.password?.type === 'required' && isSubmitted && <p className="text-rose-500 text-sm absolute">field required*</p>}
            </div>

            <p className="text-center mb-4">Go back to <a className="text-sky-500 hover:underline" href="/login">login</a></p>

			<button
				id="new-list-submit"
				className={
                    'w-[100%] py-2 mb-6 focus:outline-sky-500 transition ' + (isValid ? 'bg-sky-500 hover:bg-sky-600 hover:underline' : 'bg-sky-800')
				}
				type="submit"
			>
				create account
			</button>
		</form>
	)
}

export default SignUpForm
