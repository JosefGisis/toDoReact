import { useCallback, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

import { setActiveList, selectActiveList, removeActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

import ListIcon from '../../components/ListIcon'
import { GoKebabHorizontal, GoCheck, GoX } from 'react-icons/go'

import type { List as ListType, UpdateList } from '../../api/listsSlice.js'
import type { ListPropsWithEditingId } from './ListsList.js'

function List({ listData, editingId, setEditingId }: ListPropsWithEditingId) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	// dropDownRef is used to detect clicks outside of the dropdown menu. It requires the contains property.
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const { logout } = useAuth()
	const [deleteList] = useDeleteListMutation()
	const [deleteToDosByList] = useDeleteToDosByListMutation()
	const [updateList] = useUpdateListMutation()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm()

	// onSelect cannot be handled by handleUpdate because dispatch and other states need to be handled differently.
	const onSelect = useCallback(async (list: ListType, activeList: ListType | null) => {
		// Do not update list if it is already active
		if (list.id === activeList?.id) return

		setEditingId(null)
		reset()

		try {
			await updateList({ listId: list.id, update: { title: undefined } }).unwrap()
			dispatch(setActiveList(list))
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	const onDelete = useCallback(async (listId: number) => {
		try {
			// Delete all todos associated with the list before deleting the list
			await deleteToDosByList({ membership: listId }).unwrap()
			await deleteList(listId).unwrap()
			dispatch(removeActiveList())
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	const handleUpdate = useCallback(async (list: ListType, update: UpdateList) => {
		setEditingId(null)
		reset()
		// Do not update list if title has not changed. This happens when the user clicks the check button without changing the title.
		if (update.title === list.title) return

		try {
			await updateList({ listId: list.id, update }).unwrap()
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	// Ensures that the active list is updated when the list title is changed. Checks if the list is active and if the title is different. If so, it updates the active list.
	useEffect(() => {
		if (listData.id === activeList?.id && listData.title !== activeList.title) dispatch(setActiveList(listData))
	}, [listData])

	return (
		// div contains group tailwind class to interact with dropdown menu
		<div className={activeList?.id !== listData?.id ? 'list-not-active' : 'list-active'} onClick={() => onSelect(listData, activeList)}>
			{/* list icon and list title */}
			<div className="flex flex-row items-center">
				<div className="mr-2">
					<ListIcon />
				</div>
				<div>
					{/* both the title and a title input field */}
					{editingId === listData.id && listData?.id === activeList?.id ? (
						<form
							className="flex justify-between"
							onBlur={handleSubmit((values) => handleUpdate(listData, values))}
							onSubmit={handleSubmit((values) => handleUpdate(listData, values))}
						>
							<input
								{...register('title', {
									required: 'title required*',
									maxLength: {
										value: 35,
										message: 'maximum thirty-five characters',
									},
								})}
								className={
									'input rounded-sm input-sm w-full flex-1 max-w-xs p-1 m-0 mr-1 ' +
									(formErrors?.title ? 'input-error' : 'input-secondary')
								}
								type="text"
								defaultValue={listData.title}
								placeholder={String(formErrors?.title?.message || '')}
								autoFocus
							/>
							<button className="btn btn-ghost btn-round btn-sm mr-0.5">
								<GoCheck className="w-4 h-4" />
							</button>

							<button className="btn btn-ghost btn-round btn-sm" onClick={() => setEditingId(null)} type="button">
								<GoX className="w-4 h-4" />
							</button>
						</form>
					) : (
						<div onDoubleClick={() => setEditingId(listData.id)}>{listData.title}</div>
					)}
				</div>
			</div>

			{/* dropdown menu */}
			{editingId !== listData.id && (
				<div className={' ' + (activeList?.id === listData.id ? 'visible' : 'invisible group-hover:visible')} ref={dropdownRef}>
					<button className="btn btn-ghost btn-round btn-sm m-1" onClick={() => setDropdownOpen(!dropdownOpen)} type="button">
						<GoKebabHorizontal />
					</button>
					<ul className={dropdownOpen ? 'open-list-dropdown' : 'close-list-dropdown'}>
						<li
							onClick={() => {
								setEditingId(listData.id)
								setDropdownOpen(false)
							}}
						>
							<p>edit</p>
						</li>
						<li
							onClick={() => {
								onDelete(listData.id)
								setDropdownOpen(false)
							}}
						>
							<p className="text-error">delete!</p>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default List
