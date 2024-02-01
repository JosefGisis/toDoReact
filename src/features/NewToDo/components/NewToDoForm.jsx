import { useForm } from 'react-hook-form'
import useNewToDo from '../hooks/useNewToDo'
import { useContext, useState } from 'react'
import DataContext from '../../../state-management/data/DataContext'
import ListContext from '../../../state-management/List/ListContext'

function NewToDoForm() {
	const { data, dispatch } = useContext(DataContext)

	const { createNewToDo } = useNewToDo()
	const [_errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
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
			dispatch({ type: 'ADD TODO', payload: newToDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
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
							// required: 'date required*',
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
