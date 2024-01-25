import { useForm } from 'react-hook-form'

function NewToDoForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className="max-w-[640px] | bg-slate-800 | p-4 my-4 | rounded-lg">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="text-2xl | mb-5">Add New To-do</h3>
				<div className="flex flex-col sm:flex-row">
					<input
						{...register('toDoTitle', {
							required: 'title required*',
							minLength: {
								value: 5,
								message: 'minimum five characters required',
							},
							maxLength: {
								value: 25,
								message: 'maximum twenty-five characters',
							},
						})}
						className="text-black | max-w-[15rem] my-2 p-1 mr-4 | h-10 | rounded-md focus:outline-sky-500"
						type="text"
						placeholder="to-do title"
					></input>
					{errors?.toDoTitle && <p className="text-rose-500 text-sm absolute">{errors?.toDoTitle?.message}</p>}

					<input
						{...register('date', {
							required: 'date required*',
							pattern: {
								value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{4})$/,
								message: 'invalid date',
							},
						})}
						className="text-black | max-w-[15rem] my-2 p-1 mr-4 | h-10 | rounded-md focus:outline-sky-500"
						type="date"
						placeholder="mm/dd/yyyy"
					></input>
					{errors?.date && <p className="text-rose-500 text-sm absolute">{errors?.date?.message}</p>}
					<button className="bg-sky-800 | my-2 w-20 h-10 | rounded-md focus:outline-sky-500" type="submit">
						submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewToDoForm
