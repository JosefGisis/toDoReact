import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { useNewToDo } from '../hooks/useNewToDo'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'

function NewToDoForm() {
	const [_errors, setErrors] = useState(null)

	const { dispatch, activeListId } = useListContext()
	const { createNewToDo } = useNewToDo()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (listId, values) => {
		try {
			const [error, newToDo] = await createNewToDo(listId, values)
			if (error) {
				setErrors({ message: error })
				return
			}
			reset()
			dispatch({ type: actions.ADD_TODO, payload: newToDo })
		} catch (error) {
			setErrors({ message: error.message })
		}
	}

	useEffect(() => {
		if (_errors) console.log(_errors?.message)
	}, [_errors])

	return (
		<form onSubmit={handleSubmit((values) => onSubmit(activeListId, values))}>
			{errors?.title && <p className="text-error mb-1 text-sm">{errors?.title?.message}</p>}
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
					{/* {errors?.date && <p className="text-error text-sm absolute">{errors?.date?.message}</p>} */}
				</div>

				<button className={'btn ' + (isValid ? 'btn-info' : 'bg-neutral')} type="submit">
					<GoPlus className="w-5 h-5" />
				</button>
			</div>
		</form>
	)
}

export default NewToDoForm
