import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { useNewList } from '../hooks/useNewList'
import { useListContext } from '../../../hooks/useListContext'

import { actions } from '../../../state-management/List/listReducer'

function NewListForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	
	const { dispatch, setActiveList } = useListContext()
	const { createList } = useNewList()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (newListData) => {
		reset()
		setIsLoading(true)
		try {
			const [error, newList] = await createList(newListData)
			if (error) {
				setErrors({ message: error })
				return
			}
			setErrors(null)
			dispatch({ type: actions.ADD_LIST, payload: newList })
			setActiveList(newList.id)
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit((values) => onSubmit(values))}
		className="flex items-center align-items">
			<div className="mr-2">
				{/* <label htmlFor="list-title">list title</label> */}
				<input
					{...register('title', {
						required: 'title required*',
						maxLength: {
							value: 35,
							message: 'maximum thirty-five characters',
						},
					})}
					className="input input-bordered input-secondary w-full max-w-xs"
					type="text"
					placeholder="list title"
					></input>
					{errors?.title && <p className="text-rose-500 text-sm absolute">{errors?.title?.message}</p>}
			</div>

			<button className={'btn ' + (isValid ? 'btn-info' : 'bg-neutral')} type="submit">
				<GoPlus className="text-base-content w-5 h-5" />
			</button>
		</form>
	)
}

export default NewListForm
