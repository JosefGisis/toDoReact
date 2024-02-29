import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'
import { useDeleteList } from '../hooks/useDeleteList'
import { useUpdateList } from '../hooks/useUpdateList'
import { useDeleteListToDos } from '../hooks/useDeleteListToDos'

import { actions } from '../../../state-management/List/listReducer'
import ListIcon from '../../../components/ListIcon'

function List({ listData }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [_errors, setErrors] = useState(null)

	const { activeList, setActiveList, removeActiveList, dispatch } = useListContext()
	const { deleteList } = useDeleteList()
	const { deleteListToDos } = useDeleteListToDos()
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
			}
		},
		[activeList]
	)

	const onDelete = useCallback(async (listId) => {
		try {
			const [deleteListToDosError] = await deleteListToDos(listId)
			if (deleteListToDosError) {
				setErrors({ message: deleteListToDosError })
				return
			}
			const [deleteListError] = await deleteList(listId)
			if (deleteListError) {
				setErrors({ message: deleteListError })
				return
			}
			dispatch({ type: actions.REMOVE_LIST_TODOS, payload: listId })
			dispatch({ type: actions.REMOVE_LIST, payload: listId })
			// removeActiveList sets activeList to to-dos (default list)
			removeActiveList()
		} catch (error) {
			setErrors({ message: error.message })
		}
	}, [])

	const handleUpdate = useCallback(async (list, values) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (values.title === list.title) return
		try {
			const [error, editedList] = await updateList(list.id, values)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.UPDATE_LIST, payload: editedList })
		} catch (error) {
			setErrors({ message: error.message })
		}
	}, [])

	useEffect(() => {
		if (_errors) console.log(_errors?.message)
	}, [_errors])

	return (
		// div contains group tailwind class to interact with dropdown menu
		<div
			className={
				'group flex items-center justify-between rounded-lg px-2 mb-3 ' +
				(activeList?.id !== listData?.id
					? 'bg-base-300 text-base-content border-2 border-neutral py-2'
					: 'bg-neutral text-neutral-content py-3')
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
						<div onDoubleClick={() => setIsEditing(true)}>{listData.title}</div>
					)}
				</div>
			</div>

			<div
				className={'dropdown dropdown-bottom dropdown-end ' + (activeList?.id === listData.id ? 'visible' : 'invisible group-hover:visible')}
				onClick={() => setDropdownOpen(true)}
			>
				<div role="button" className="btn btn-ghost btn-round btn-sm m-1">
					<GoKebabHorizontal />
				</div>
				<ul
					className={
						'dropdown-content dropdown-left menu p-2 shadow bg-base-300 text-base-content border border-primary rounded-md w-24 z-[1] ' +
						(dropdownOpen ? '' : 'hidden')
					}
				>
					<li
						onClick={() => {
							setDropdownOpen(false)
							setIsEditing(true)
						}}
					>
						<p>edit</p>
					</li>
					<li
						onClick={() => {
							setDropdownOpen(false)
							onDelete(listData.id)
						}}
					>
						<p className="text-rose-500">delete!</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default List
