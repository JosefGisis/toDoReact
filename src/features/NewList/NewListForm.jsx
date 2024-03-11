import { useDispatch } from 'react-redux'
import { setActiveList } from '../../app/activeListSlice'
import { useCreateListMutation } from '../../api/listsSlice'

import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

function NewListForm() {
	const dispatch = useDispatch()
	const [createList] = useCreateListMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (newListData) => {
		reset()
		try {
			const newList = await createList(newListData).unwrap()
			dispatch(setActiveList(newList))
		} catch (error) {
			console.error(error)
		}
	}

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
