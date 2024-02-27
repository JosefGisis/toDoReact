import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import { useNewList } from '../hooks/useNewList'
import { useListContext } from '../../../hooks/useListContext'

import { actions } from '../../../state-management/List/listReducer'

function NewListForm() {
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
		try {
			const [error, newList] = await createList(newListData)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.ADD_LIST, payload: newList })
			setActiveList(newList.id)
		} catch (error) {
			setErrors({ message: error.message })
		}
	}

	useEffect(() => {
		if (_errors) console.log( _errors?.message )
	}, [_errors])

	return (
		<form onSubmit={handleSubmit((values) => onSubmit(values))}>
			{errors?.title && <p className="text-error text-sm mb-1">{errors?.title?.message}</p>}
			<div className="flex items-center align-items">
				<input
					{...register('title', {
						required: 'title required*',
						maxLength: {
							value: 35,
							message: 'maximum thirty-five characters',
						}
					})}
					className="input input-bordered input-secondary w-full max-w-xs mr-2"
					type="text"
					placeholder="list title"
				></input>

				<button className={'btn ' + (isValid ? 'btn-secondary' : 'bg-neutral')} type="submit">
					<GoPlus className="w-5 h-5" />
				</button>
			</div>
		</form>
	)
}

export default NewListForm
