import { useCallback, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveList, selectActiveList, removeActiveList } from '../../app/activeListSlice'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'

import ListIcon from '../../components/ListIcon'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

function List({ listData }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const dropdownRef = useRef(null)

	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const [deleteList] = useDeleteListMutation()
	const [deleteToDosByList] = useDeleteToDosByListMutation()
	const [updateList] = useUpdateListMutation()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm()

	// onSelect cannot be handled by handleUpdate because dispatch and other states need to be handled differently
	const onSelect = useCallback(
		async (list) => {
			if (list.id === activeList?.id) return
			setIsEditing(false)
			reset()
			try {
				await updateList({ listId: list.id }).unwrap()
				dispatch(setActiveList(list))
			} catch (error) {
				console.log(error)
			}
		},
		[activeList]
	)

	const onDelete = useCallback(async (listId) => {
		try {
			await deleteToDosByList({ membership: listId }).unwrap()
			await deleteList(listId).unwrap()
			dispatch(removeActiveList())
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleUpdate = useCallback(async (list, values) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (values.title === list.title) return
		try {
			await updateList({ listId: list.id, update: { ...values } }).unwrap()
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		if (listData.id === activeList?.id) dispatch(setActiveList(listData))
	}, [listData])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false)
		}
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
			onClick={() => onSelect(listData)}
		>
			<div className='flex flex-row items-center'>
				<div className='mr-2'>
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
								className={
									'input rounded-sm input-sm w-full max-w-xs p-1 m-0 ' + (formErrors?.title ? 'input-error' : 'input-secondary')
								}
								type='text'
								defaultValue={listData.title}
								placeholder={formErrors?.title && formErrors?.title?.message}
							/>
						</form>
					) : (
						<div onDoubleClick={() => setIsEditing(true)}>{listData.title}</div>
					)}
				</div>
			</div>

			<div className={' ' + (activeList?.id === listData.id ? 'visible' : 'invisible group-hover:visible')} ref={dropdownRef}>
				<button className='btn btn-ghost btn-round btn-sm m-1' onClick={() => setDropdownOpen(!dropdownOpen)} type='button'>
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
						<p className='text-error'>delete!</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default List
