import { useForm } from 'react-hook-form'
import useNewToDo from '../hooks/useNewToDo'
import { useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'
import { GoPlus } from 'react-icons/go'

function NewToDoForm() {
	const [_errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	
	const { dispatch, activeListId } = useListContext()
	const { createNewToDo } = useNewToDo()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (listId, values) => {
		setIsLoading(true)
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
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit((values) => onSubmit(activeListId, values))}>
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
					{errors?.toDoTitle && <p className="text-error text-sm absolute">{errors?.toDoTitle?.message}</p>}
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
					{errors?.date && <p className="text-error text-sm absolute">{errors?.date?.message}</p>}
				</div>

				<button className={'btn ' + (isValid ? 'btn-info' : 'bg-neutral')} type="submit">
					<GoPlus className="text-base-content w-5 h-5" />
				</button>
			</div>
		</form>
	)
}

export default NewToDoForm
