import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useCreateToDoMutation } from '../../api/toDosSlice'
import { selectActiveList } from '../../app/activeListSlice'
import { useAuth } from '../../hooks/useAuth'

import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import type { CreateToDo } from '../../api/toDosSlice'

function NewToDoForm() {
	const [_errors, setErrors] = useState<null | string>(null)
	const activeList = useSelector(selectActiveList)
	const [createToDo] = useCreateToDoMutation()

	const { logout } = useAuth()

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
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
			else if (error?.status === 400 && typeof error?.status === 'string') setErrors(error?.message)
			else setErrors('Error creating list')
		}
	}

	return (
		<form onSubmit={handleSubmit((values) => onSubmit({ membership: activeList?.id, title: values.title, dueDate: values.date }))}>
			<p className="text-error mb-1 text-sm">{String(errors?.title?.message || '')}</p>
			<div className="flex items-center sm:flex-row">
				{/* title field */}
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

				{/* due-date field */}
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
					{/* <p className="text-error text-sm absolute">{String(errors?.date?.message || '')}</p> */}
				</div>

				<button className={'btn ' + (isValid ? 'btn-info' : 'bg-neutral')} type="submit">
					<GoPlus className="w-5 h-5" />
				</button>
			</div>
		</form>
	)
}

export default NewToDoForm
