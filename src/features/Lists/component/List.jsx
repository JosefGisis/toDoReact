import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'
import { useDeleteList } from '../hooks/useDeleteList'
import { useUpdateList } from '../hooks/useUpdateList'

import { actions } from '../../../state-management/List/listReducer'

import ListIcon from '../../../components/ListIcon'

function List({ listData }) {
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	// if (_errors && isLoading && errors && isValid) console.log('')

	const { activeList, setActiveList, removeActiveList, dispatch } = useListContext()
	const { deleteList } = useDeleteList()
	const { updateList } = useUpdateList()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// onSelect cannot be handled by handleUpdate because dispatch and other states need to be handled differently
	const onSelect = useCallback(
		async (listId) => {
			if (listId === activeList?.id) return
			setIsLoading(true)
			setIsEditing(false)
			reset()
			try {
				const [error] = await updateList(listId)
				if (error) {
					console.log(error)
					setErrors({ message: error })
					return
				}
				setActiveList(listId)
				// if dispatched, sorting features cause list to sort on click
				// dispatch({ type: actions.UPDATE_LIST, payload: updatedList })
			} catch (error) {
				setErrors({ message: error.message })
			} finally {
				setIsLoading(false)
			}
		},
		[activeList]
	)

	const onDelete = useCallback(async (listId) => {
		setIsLoading(true)
		try {
			const [error] = await deleteList(listId)
			if (error) {
				setErrors({ message: error })
				return
			}
			// removeActiveList sets activeList to to-dos (default list)
			removeActiveList()
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [])

	const handleUpdate = useCallback(async (list, values) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (values.title === list.title) return
		setIsLoading(true)
		try {
			const [error, editedList] = await updateList(list.id, values)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.UPDATE_LIST, payload: editedList })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}, [])

	return (
		<div
			className={
				'list-list-item flex flex-row items-center justify-between rounded-lg px-2 mb-3 border-2 border-accent ' +
				(activeList?.id === listData?.id ? ' active bg-neutral py-3' : 'bg-base-300 py-2')
			}
			onClick={() => onSelect(listData.id)}
		>
			<div className="flex flex-row items-center">
				<div className="flex-1 mr-2">
					<ListIcon />
				</div>
				<div>
					{isEditing && listData?.id === activeList?.id ? (
						<form
							onBlur={handleSubmit((values) => handleUpdate(listData, { title: values.title }))}
							onSubmit={handleSubmit((values) => handleUpdate(listData, { title: values.title }))}
						>
							<input
								{...register('title', {
									required: 'title required*',
									maxLength: {
										value: 35,
										message: 'maximum thirty-five characters',
									},
								})}
								className={'input rounded-sm input-sm w-full max-w-xs p-1 m-0 ' + (errors?.title ? 'input-error' : 'input-secondary')}
								type="text"
								defaultValue={listData.title}
								placeholder={errors?.title && errors?.title?.message}
							/>
						</form>
					) : (
						<div
							onDoubleClick={() => {
								setIsEditing(true)
							}}
						>
							{listData.title}
						</div>
					)}
				</div>
			</div>

			<div className="menu-btn dropdown dropdown-bottom dropdown-end" style={{ visibility: 'hidden' }}>
				<div tabIndex={0} role="button" className="btn btn-ghost btn-round btn-sm m-1">
					<GoKebabHorizontal />
				</div>
				<ul tabIndex={0} className="dropdown-content dropdown-left menu p-2 shadow bg-info rounded-box w-24">
					<li onClick={() => setIsEditing(true)}>
						<p>edit</p>
					</li>
					<li onClick={() => onDelete(listData.id)}>
						<p className="text-rose-500">delete</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default List
