import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveList } from '../../app/activeListSlice'
import { useCreateListMutation, useGetListsQuery } from '../../api/listsSlice'
import { useAuth } from '../../hooks/useAuth'

import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import type { CreateList } from '../../api/listsSlice'

function NewListForm() {
	const [_errors, setErrors] = useState<null | string>(null)
	
	const dispatch = useDispatch()
	
	const { logout } = useAuth()
	const [createList] = useCreateListMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (newListData: CreateList) => {
		reset()
		try {
			const newList = await createList(newListData).unwrap()
			dispatch(setActiveList(newList))
			useGetListsQuery()
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
			else if (error?.status === 400 && typeof error?.status === 'string') setErrors(error?.message)
			else setErrors('Error creating list')
		}
	}

	return (
		<form onSubmit={handleSubmit((values) => onSubmit(values as CreateList))}>
			<p className="text-error text-sm mb-1">{String(errors?.title?.message || '')}</p>
			<div className="flex items-center align-items">
				<input
					{...register('title', {
						required: 'title required*',
						maxLength: {
							value: 35,
							message: 'maximum thirty-five characters',
						},
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
