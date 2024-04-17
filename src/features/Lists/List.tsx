import { useCallback, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

import { setActiveList, selectActiveList, removeActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

import ListIcon from '../../components/ListIcon'
import { GoKebabHorizontal } from 'react-icons/go'

import type { List as ListType, UpdateList } from '../../api/listsSlice.js'

function List({ listData }: { listData: ListType }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

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

		setIsEditing(false)
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
			await deleteToDosByList({ membership: listId }).unwrap()
			await deleteList(listId).unwrap()
			dispatch(removeActiveList())
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	const handleUpdate = useCallback(async (list: ListType, update: UpdateList) => {
		setIsEditing(false)
		reset()
		// Do not update list if title is the same
		if (update.title === list.title) return

		try {
			await updateList({ listId: list.id, update }).unwrap()
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	// Checks if the list is active and updates the active list if it is not.
	useEffect(() => {
		if (listData.id !== activeList?.id) dispatch(setActiveList(listData))
	}, [listData])

	// Sets up event handler for clicks outside of the dropdown menu and toggles the dropdown menu.
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// is the dropdownRef with the event.target. If not the mouse click is outside of the dropdown menu.
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setDropdownOpen(false)
		}

		// Sets up event listener for clicks outside of the dropdown menu and removes on unmount.
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		// div contains group tailwind class to interact with dropdown menu
		<div
			className={
				'group flex items-center justify-between rounded-lg px-2 mb-3 ' +
				(activeList?.id !== listData?.id
					? 'bg-base-300 text-base-content border-2 border-neutral py-2'
					: 'bg-neutral text-neutral-content py-3')
			}
			onClick={() => onSelect(listData, activeList)}
		>
			{/* list icon and list title */}
			<div className="flex flex-row items-center">
				<div className="mr-2">
					<ListIcon />
				</div>
				<div>
					{/* both the title and a title input field */}
					{isEditing && listData?.id === activeList?.id ? (
						<form
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
									'input rounded-sm input-sm w-full max-w-xs p-1 m-0 ' + (formErrors?.title ? 'input-error' : 'input-secondary')
								}
								type="text"
								defaultValue={listData.title}
								placeholder={String(formErrors?.title?.message)}
								autoFocus
							/>
						</form>
					) : (
						<div onDoubleClick={() => setIsEditing(true)}>{listData.title}</div>
					)}
				</div>
			</div>

			{/* dropdown menu */}
			<div className={' ' + (activeList?.id === listData.id ? 'visible' : 'invisible group-hover:visible')} ref={dropdownRef}>
				<button className="btn btn-ghost btn-round btn-sm m-1" onClick={() => setDropdownOpen(!dropdownOpen)} type="button">
					<GoKebabHorizontal />
				</button>
				<ul
					className={
						'dropdown-content dropdown-left menu p-2 shadow bg-base-300 text-base-content border border-secondary rounded-md w-[7rem] z-[1] -translate-x-[4rem] absolute ' +
						(dropdownOpen ? '' : 'hidden')
					}
				>
					<li
						onClick={() => {
							setIsEditing(true)
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
		</div>
	)
}

export default List
