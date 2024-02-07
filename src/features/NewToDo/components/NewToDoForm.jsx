import { useForm } from 'react-hook-form'
import useNewToDo from '../hooks/useNewToDo'
import { useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'

function NewToDoForm() {
	const { dispatch } = useListContext()

	const { createNewToDo } = useNewToDo()
	const [_errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		setIsLoading(true)
		try {
			const [error, newToDo] = await createNewToDo(data)
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
		<div className="max-w-[640px] bg-neutral p-4 my-4 rounded-lg">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="text-2xl | mb-5">Add New To-do</h3>
				<div className="flex flex-col sm:flex-row">
					<div className="my-2">
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
							className="text-accent max-w-[15rem] p-1 mr-4 | h-10 | rounded-md focus:outline-accent"
							type="text"
							placeholder="to-do title"
						></input>
						{errors?.toDoTitle && <p className="text-error text-sm absolute">{errors?.toDoTitle?.message}</p>}
					</div>

					<div className="my-2">
						<input
							{...register('date', {
								pattern: {
									value: /^\d{4}-\d{2}-\d{2}$/,
									message: 'date format mm/dd/yyyy required',
								},
							})}
							className="text-accent max-w-[15rem] p-1 mr-4 h-10 rounded-md focus:outline-sky-500"
							type="date"
						></input>
						{errors?.date && <p className="text-error text-sm absolute">{errors?.date?.message}</p>}
					</div>

					<button className="btn btn-secondary" type="submit">
						submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewToDoForm
