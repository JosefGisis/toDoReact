import { useSelector } from 'react-redux'
import { useCreateToDoMutation } from '../../api/toDosSlice'
import { selectActiveList } from '../../app/activeListSlice'

import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import type { CreateToDo } from '../../api/toDosSlice'

function NewToDoForm() {
	const activeList = useSelector(selectActiveList)
	const [createToDo] = useCreateToDoMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (values: CreateToDo) => {
		try {
			reset()
			await createToDo(values).unwrap()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit((values) => onSubmit({ membership: activeList?.id, title: values.title, dueDate: values.date }))}>
			{errors?.title && <p className="text-error mb-1 text-sm">{errors?.title?.message as string}</p>}
			<div className="flex items-center sm:flex-row">
				<div className="mr-2">
					<input
						{...register('title', {
							required: 'title required*',
							maxLength: {
								value: 100,
								message: 'maximum one-hundred characters required',
							},
						})}
						className="input input-bordered input-secondary w-full max-w-xs"
						type="text"
						placeholder="to-do title"
					></input>
				</div>

				<div className="mr-2">
					<input
						{...register('date', {
							pattern: {
								value: /^\d{4}-\d{2}-\d{2}$/,
								message: 'date format mm/dd/yyyy required',
							},
						})}
						className="input input-bordered input-secondary w-full max-w-xs"
						type="date"
					></input>
					{/* commented out because this warning message affects styling */}
					{/* {errors?.date && <p className="text-error text-sm absolute">{errors?.date?.message as string}</p>} */}
				</div>

				<button className={'btn ' + (isValid ? 'btn-info' : 'bg-neutral')} type="submit">
					<GoPlus className="w-5 h-5" />
				</button>
			</div>
		</form>
	)
}

export default NewToDoForm
